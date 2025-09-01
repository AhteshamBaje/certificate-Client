import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Navbar } from '../components/ui/Navbar';
import { getItem } from '../utils/localStorage';

const OfferLetterList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [issuedStatus, setIssuedStatus] = useState({});

    const user = getItem("certificate_user");

    const searchEmploye = async () => {
        try {
            const response = await axios.get(`/api2/searchdata2/${searchQuery}`);
            if (response.data.success) {
                setFilteredData(response.data.data);
            } else {
                alert("No employee found");
            }
        } catch (error) {
            console.error("Search Error:", error);
            alert(error.response?.data?.message || "Error searching employee.");
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const InputFileRef = useRef(null);

    const handleUpload = async () => {
        try {
            const data = await selectedFile.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

            const response = await axios.post(
                "/api2/offer/upload",
                { jsonData, user: user?._id },
                { headers: { "Content-Type": "application/json" } }
            );

            alert(response.data.message);
            fetchData();
            fetchTotalRecords2();

            if (InputFileRef.current) {
                InputFileRef.current.value = "";
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert(error.response?.data?.message || "Upload failed");
        }
    };

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => (prev < totalPages ? prev + 1 : prev));

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api2/OfferLetterList/${page}`);
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

    const fetchTotalRecords2 = async () => {
        try {
            const response = await axios.get("/api2/totalRecords2");
            if (response.status === 200) {
                setTotalRecords(response.data.totalRecords);
            }
        } catch (error) {
            console.error("Error fetching total records:", error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchTotalRecords2();
    }, [page]);

    const delEmploye = async (id) => {
        if (!window.confirm("Do you want to delete?")) return;
        try {
            const res = await axios.delete(`/api2/deleteOfferLeter/${id}`);
            if (res.status === 200) {
                alert("Employee deleted successfully");
                fetchTotalRecords2();
                setFilteredData((prevData) => prevData.filter((employe) => employe._id !== id));
            }
        } catch (error) {
            alert("Error deleting employee.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Search by employee name..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value === "") fetchData();
                    }}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
                />
                <button className="bg-slate-700 text-white hover:bg-slate-400 rounded-xl px-3 ml-2" onClick={searchEmploye}>
                    Search
                </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center px-4 mt-6">
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <input type="file" className="p-2 px-4 rounded-xl border border-black" onChange={handleFileChange} ref={InputFileRef} />
                    <button className="p-2 rounded-xl bg-slate-700 text-white hover:bg-slate-400" onClick={handleUpload}>
                        Upload File
                    </button>

                    <a href='/Templates/OfferSheet.xlsx' className='rounded-xl bg-cyan-600 text-white hover:bg-slate-400 p-2'>
                        Download Excel Format.
                    </a>
                </div>
                <p className="font-bold text-green-700 text-lg mt-2 md:mt-0">Total Records: {totalRecords}</p>
            </div>

            <marquee behavior="alternate" direction="ltr" className="text-red-500">Date must be in ( mm/dd/yyyy ) Format</marquee>

            <div className="overflow-x-auto py-5 px-2">
                <table className="w-full max-w-6xl mx-auto border-collapse">
                    <caption className="text-center font-bold text-2xl py-5">Offer Letter CERTIFICATES</caption>
                    <thead className="bg-black text-white text-base">
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Salary</th>
                            <th className="border p-2">Job Role</th>
                            <th className="border p-2">Start Date</th>
                            <th className="border p-2">Reference Number</th>
                            <th className="border p-2">Issued Date</th>
                            <th className="border p-2">Issued By</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((employe) => (
                                <tr key={employe._id} className="border hover:bg-gray-100 text-sm">
                                    <td className="border p-2">{employe._id}</td>
                                    <td className="border p-2">{employe.name}</td>
                                    <td className="border p-2">{employe.email}</td>
                                    <td className="border p-2">{employe.salary}</td>
                                    <td className="border p-2">{employe.jobRole}</td>
                                    <td className="border p-2">{new Date(employe.startDate).toLocaleDateString("en-IN")}</td>
                                    <td className="border p-2">{employe.RefereneNo}</td>
                                    <td className="border p-2 text-green-700">
                                        {employe.issuedDate || issuedStatus[employe._id]?.date ? (
                                            <div className="flex items-center space-x-1">
                                                <span>
                                                    {new Date(employe.issuedDate || issuedStatus[employe._id]?.date).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                                <svg className="w-5 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <span className="text-red-500">Not issued</span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {employe?.user?.email || "-"}
                                    </td>
                                    <td className="border p-2 flex space-x-2">
                                        <button className="bg-blue-200 text-white hover:bg-green-600 px-2 py-1 rounded-md" onClick={() => navigate(`/OfferLetter/${employe._id}`)}>
                                            <svg
                                                className="w-5 h-4 text-gray-800"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="25"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                                                />
                                            </svg></button>

                                        <button className="border-2 text-white hover:bg-red-600 px-2 py-1 rounded-md" onClick={() => delEmploye(employe._id)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="25"
                                                height="25"
                                                viewBox="0 0 30 30"
                                            >
                                                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                            </svg></button>

                                        <button className="bg-white border-2 text-white hover:bg-blue-400 px-2 py-1 rounded-md  " onClick={() => navigate(`/updateoffer/${employe._id}`)}>
                                            <svg
                                                className="w-5 h-4 text-gray-800"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
                                                />
                                            </svg></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4 text-gray-500">No results found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between p-4">
                <button
                    className="bg-slate-600 px-2 text-white rounded-lg hover:bg-slate-400 disabled:opacity-50"
                    onClick={handlePrev}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <p className="p-3 border-b-2 rounded-lg bg-slate-300">Page {page} of {totalPages}</p>
                <button
                    className="bg-slate-600 px-2 text-white hover:bg-slate-400 rounded-lg disabled:opacity-50"
                    onClick={handleNext}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default OfferLetterList;
