import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Navbar } from '../components/ui/Navbar';

const CourseList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0)

    const searchCourseStudent = async () => {
        try {
            const searchSname = await axios.get(`/api3/searchdata3/${searchQuery}`);
            if (searchSname.data.success) {
                setFilteredData(searchSname.data.data);
            } else {
                alert("No students found")
            }
        } catch (error) {
            console.error("Search Error:", error);
            alert(error.response?.data?.message || "Error searching student.");
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
                "/api3/course/upload",
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
            const response = await axios.get(`/api3/courseList/${page}`);
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

    const delCourse = async (id) => {
        if (!window.confirm("Do you want to delete?")) return;
        try {
            const res = await axios.delete(`/api3/delCourse/${id}`);
            if (res.status === 200) {
                alert("Course Student deleted successfully");
                setFilteredData((prevData) => prevData.filter((intern) => intern._id !== id));
            } else {
                alert("Failed to delete. Record may not exist.");
            }
        } catch (error) {
            alert("Error deleting Course Student.");
        }
    };

    useEffect(() => {
        const fetchTotalRecords = async () => {
            try {
                const response = await axios.get("/api3/totalRecords");
                if (response.status === 200) {
                    setTotalRecords(response.data.totalRecords);
                }
            } catch (error) {
                console.error("Error fetching total records:", error)
            };
        }
        fetchTotalRecords();
    }, []);


    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-4">
                <input type="text" placeholder="Search by student name..." value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value === "") fetchData(); }}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg" />
                <button className='bg-slate-400 text-white hover:bg-slate-600 rounded-xl px-3' onClick={searchCourseStudent}>Search</button>
            </div>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col md:flex-row ml-2 mt-6'>
                    <input type="file" className='p-2 px-4 flex  rounded-xl  border border-black mr-2' onChange={handleFileChange} />
                    <button className='p-2 px-2 rounded-2xl bg-slate-400 text-white hover:bg-slate-600' onClick={handleUpload}>Upload File</button>
                </div>
                <div className='mt-6'>
                    <p className='justify-end py-2 px-24 font-bold text-green-700 text-lg'>Total Records : {totalRecords}</p>
                </div>
            </div>
            <div className="table-container flex justify-center items-center mx-10 py-5 overflow-x-auto">
                <table className="w-full max-w-5xl border-collapse">
                    <caption className="text-center font-bold text-2xl py-5">COURSE CERTIFICATES</caption>
                    <thead>
                        <tr className="bg-black text-white text-base">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Student Name</th>
                            <th className="border p-2">TITLE</th>
                            <th className="border p-2">Start Date</th>
                            <th className="border p-2">End Date</th>
                            <th className="border p-2">Certificate Number</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? filteredData.map((intern) => (
                            <tr key={intern._id} className="border hover:bg-gray-100 text-sm">
                                <td className="border p-2">{intern._id}</td>
                                <td className="border p-2">{intern.studentName}</td>
                                <td className="border p-2">{intern.title}</td>
                                <td className="border p-2">{new Date(intern.startDate).toLocaleDateString("en-IN")}</td>
                                <td className="border p-2">{new Date(intern.endDate).toLocaleDateString("en-IN")}</td>
                                <td className="border p-2">{intern.certificateNumber}</td>
                                <td className="border p-2 flex space-x-2">
                                    <button className="bg-green-700 text-white hover:bg-blue-400 px-2 py-1 rounded-md" onClick={() => navigate(`/CourseCertificate/${intern._id}`)}>Download</button>
                                    <button className="bg-red-700 text-white hover:bg-red-400 px-2 py-1 rounded-md" onClick={() => delCourse(intern._id)}>Delete</button>
                                    <button className="bg-blue-700 text-white hover:bg-blue-400 px-2 py-1 rounded-md" onClick={() => navigate(`/course/update/${intern._id}`)}>Edit</button>
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
export default CourseList;
