import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Navbar } from '../components/ui/Navbar';

const OfferLetterList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [totalRecords , setTotalRecords] = useState(0);

    const searchEmploye = async () => {
        try {
            const searchEname = await axios.get(`http://localhost:8003/api2/searchdata2/${searchQuery}`);
            if (searchEname.data.success) {
                setFilteredData(searchEname.data.data);
            } else {
                alert("No Employe found")
            }
        } catch (error) {
            console.error("Search Error:", error);
            alert(error.response?.data?.message || "Error searching Employe.");
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]); // Ensure a file is selected
            console.log(event.target.files[0].name);

        } else {
            setSelectedFile(null);
        }
    };


    const handleUpload = async () => {
        console.log(selectedFile);
        try {
            const data = await selectedFile.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" }); // Fix read method
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

            console.log("Parsed JSON Data:", jsonData); // Debugging

            // ✅ Ensure JSON is sent correctly
            const response = await axios.post(
                "http://localhost:8003/api2/offer/upload",
                { jsonData }, // Directly send the JSON
                {
                    headers: {
                        "Content-Type": "application/json", // Fix header
                    },
                }
            );

            alert(response.data.message);
            console.log("Uploaded file Path:", response.data);
        } catch (error) {
            console.error("Upload error:", error);
            alert(error.response?.data?.message || "Upload failed");
        }
    };

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => (prev < totalPages ? prev + 1 : prev));

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8003/api2/OfferLetterList/${page}`);
            if (!response.data || response.data.data.length === 0) {
                alert("No data found.");
                return;
            }
            setData(response.data.data);
            setFilteredData(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            alert("An error occurred while fetching the data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const delEmploye = async (id) => {
        if (!window.confirm("Do you want to delete?")) return;
        try {
            const res = await axios.delete(`http://localhost:8003/api2/deleteOfferLeter/${id}`);
            if (res.status === 200) {
                alert("employe deleted successfully");
                setFilteredData((prevData) => prevData.filter((employe) => employe._id !== id));
            }
        } catch (error) {
            alert("Error deleting employe.");
        }
    };

      useEffect(() => {
            const fetchTotalRecords2 = async () => {
                try {
                    const response = await axios.get("http://localhost:8003/api2/totalRecords2");
                    if (response.status === 200) {
                        setTotalRecords(response.data.totalRecords);
                    }
                } catch (error) {
                    console.error("Error fetching total records:", error)
                };
            }
            fetchTotalRecords2();
        }, []);

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-4">
                <input type="text" placeholder="Search by Employe name..." value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value === "") fetchData(); }}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg" />
                <button className='bg-slate-400 text-white hover:bg-slate-600 rounded-xl px-3' onClick={searchEmploye}>Search</button>
            </div>
            <div className='flex ml-4 mt-6 justify-between'>
                <input type="file" className='p-2 rounded-xl border' onChange={handleFileChange} />
                <button className='p-2 rounded-2xl bg-slate-400 text-white hover:bg-slate-600' onClick={handleUpload}>Upload File</button>

                <p className='flex justify-end p-2 px-20 font-bold text-green-700 text-lg'>Total Records : {totalRecords}</p>
            </div>
            <div className="table-container flex justify-center items-center mx-10 py-5 overflow-x-auto">
                <table className="w-full max-w-5xl border-collapse">
                    <caption className="text-center font-bold text-2xl py-5">Offer Letter CERTIFICATES</caption>
                    <thead>
                        <tr className="bg-black text-white">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Salary</th>
                            <th className="border p-2">Job Role</th>
                            <th className="border p-2">Start Date</th>
                            <th className="border p-2">Reference Number</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? filteredData.map((employe) => (
                            <tr key={employe._id} className="border hover:bg-gray-100">
                                <td className="border p-2">{employe._id}</td>
                                <td className="border p-2">{employe.name}</td>
                                <td className="border p-2">{employe.email}</td>
                                <td className="border p-2">{employe.salary}</td>
                                <td className="border p-2">{employe.jobRole}</td>
                                <td className="border p-2">{new Date(employe.startDate).toLocaleDateString("en-IN")}</td>
                                <td className="border p-2">{employe.RefereneNo}</td>
                                <td className="border p-2 flex space-x-2">
                                    <button className="bg-red-700 text-white hover:bg-red-400 px-2 py-1 rounded-md" onClick={() => delEmploye(employe._id)}>Delete</button>
                                    <button className="bg-blue-700 text-white hover:bg-blue-400 px-2 py-1 rounded-md" onClick={() => navigate(`/OfferLetter/${employe._id}`)}>Download</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="8" className="text-center py-4 text-gray-500">No results found</td></tr>}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between p-4'>
                <button className='bg-slate-600 px-2 text-white rounded-lg hover:bg-slate-400' onClick={handlePrev} disabled={page === 1}>Previous</button>
                <p className='p-3 border-b-2 rounded-lg'>Page {page} of {totalPages}</p>
                <button className='bg-slate-600 px-2 text-white hover:bg-slate-400 rounded-lg' onClick={handleNext} disabled={page === totalPages}>Next</button>
            </div>
        </>
    );
};
export default OfferLetterList;
