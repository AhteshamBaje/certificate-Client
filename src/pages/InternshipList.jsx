import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Navbar } from "../components/ui/Navbar";
import { Input } from "postcss";

const InternshipList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [issuedStatus, setIssuedStatus] = useState({});

    const searchStudent = async () => {
        try {
            const res = await axios.get(`/api/searchdata/${searchQuery}`);
            if (res.data.success) {
                setFilteredData(res.data.data);
            } else {
                alert("No students found.");
            }
        } catch (err) {
            console.error(err);
            alert("Error searching student.");
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]); // Ensure a file is selected
            console.log(e.target.files[0].name);
        } else {
            setSelectedFile(null);
        }
    };

    const InputFileRef = useRef(null);

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        try {
            const buffer = await selectedFile.arrayBuffer();
            const workbook = XLSX.read(buffer, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

            const existingUSNs = new Set(data.map((item) => item.usn));
            const newRecords = jsonData.filter((item) => !existingUSNs.has(item.usn));

            if (newRecords.length === 0) {
                alert("No new records to upload.");
                return;
            }

            const res = await axios.post(
                "/api/internship/upload",
                { jsonData: newRecords },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            alert(res.data.message);
            fetchData();
            fetchTotalRecords();

            if(InputFileRef.current){
                InputFileRef.current.value = "";
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed.");
        }
    };

    useEffect;
    const fetchTotalRecords = async () => {
        try {
            const res = await axios.get("/api/totalRecords");
            if (res.status === 200) {
                setTotalRecords(res.data.totalRecords);
            }
        } catch (err) {
            console.error("Error fetching total records:", err);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/studentlist/${page}`);
            if (res.data && res.data.data.length > 0) {
                setData(res.data.data);
                setFilteredData(res.data.data);
                setTotalPages(res.data.totalPages);
            } else {
                setData([]);
                setFilteredData([]);
            }
        } catch (err) {
            alert("Error fetching student data.");
        }
    };

    useEffect(() => {
        fetchData();
        fetchTotalRecords();
    }, [page]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;

        try {
            const res = await axios.delete(`/api/delIntern/${id}`);
            if (res.status === 200) {
                alert("Record deleted successfully.");
                setFilteredData((prev) => prev.filter((intern) => intern._id !== id));
                fetchTotalRecords();
            }
        } catch (err) {
            alert("Failed to delete.");
        }
    };

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () =>
        setPage((prev) => (prev < totalPages ? prev + 1 : prev));

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Search by student name..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value === "") fetchData();
                    }}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
                />
                <button
                    className="bg-slate-700 text-white hover:bg-slate-400 rounded-xl px-3 ml-2"
                    onClick={searchStudent}
                >
                    Search
                </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center px-4 mt-6">
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <input
                        type="file"
                        className="border border-black p-2 rounded-xl"
                        onChange={handleFileChange}
                        ref={InputFileRef}
                    />
                    <button
                        className="bg-slate-700 text-white hover:bg-slate-400 p-2 rounded-xl"
                        onClick={handleUpload}
                    >
                        Upload File
                    </button>

                    <a href="/Templates/InternshipStudentsSheet.xlsx" download className='rounded-xl bg-cyan-600 text-white hover:bg-slate-400 p-2' >
                        Download Excel Format.
                    </a>
                </div>
                <p className="font-bold text-green-700 text-lg mt-2 md:mt-0">
                    Total Records: {totalRecords}
                </p>
            </div>

            <marquee behavior="alternate" direction="ltr" className="text-red-500">Date must be in ( mm/dd/yyyy ) Format</marquee>


            <div className="overflow-x-auto py-5 px-2">
                <table className="w-full border-collapse max-w-6xl mx-auto">
                    <caption className="text-center font-bold text-2xl py-5">
                        INTERNSHIP CERTIFICATES
                    </caption>
                    <thead className="bg-black text-white text-sm">
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Student Name</th>
                            <th className="border p-2">USN</th>
                            <th className="border p-2">Course</th>
                            <th className="border p-2">Start Date</th>
                            <th className="border p-2">End Date</th>
                            <th className="border p-2">Certificate No.</th>
                            <th className="border p-2">Issued Date</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((intern) => (
                                <tr
                                    key={intern._id}
                                    className="hover:bg-gray-100 text-sm text-center"
                                >
                                    <td className="border p-2">{intern._id}</td>
                                    <td className="border p-2">{intern.studentName}</td>
                                    <td className="border p-2">{intern.usn}</td>
                                    <td className="border p-2">{intern.course}</td>
                                    <td className="border p-2">
                                        {new Date(intern.startDate).toLocaleDateString("en-IN")}
                                    </td>
                                    <td className="border p-2">
                                        {new Date(intern.endDate).toLocaleDateString("en-IN")}
                                    </td>
                                    <td className="border p-2">{intern.certificateNumber}</td>
                                    <td className="border p-2 text-green-700">
                                        {intern.issuedDate || issuedStatus[intern._id]?.date ? (
                                            <div className="flex items-center space-x-1">
                                                <span>
                                                    {new Date(
                                                        intern.issuedDate || issuedStatus[intern._id]?.date
                                                    ).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                                <svg
                                                    className="w-5 h-5 text-green-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        ) : (
                                            <span className="text-red-500">Not issued</span>
                                        )}
                                    </td>

                                    <td className="border p-2 flex space-x-2">
                                        <button
                                            className="bg-blue-200 text-white hover:bg-green-600 px-2 py-1 rounded-md"
                                            onClick={() =>
                                                navigate(`/Internshipcertificate/${intern._id}`)
                                            }
                                        >
                                            <svg
                                                className="w-5 h-4 text-gray-800 dark:text-white"
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
                                            </svg>
                                        </button>
                                        <button
                                            className="border-2 text-white hover:bg-red-600 px-2 py-1 rounded-md"
                                            onClick={() => handleDelete(intern._id)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="25"
                                                height="25"
                                                viewBox="0 0 30 30"
                                            >
                                                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            className="bg-white border-2 text-white hover:bg-blue-400 px-2 py-1 rounded-md  "
                                            onClick={() =>
                                                navigate(`/Internship/Update/${intern._id}`)
                                            }
                                        >
                                            <svg
                                                className="w-5 h-4 text-gray-800 dark:text-white"
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
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4 text-gray-500">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center px-6 py-4">
                <button onClick={handlePrev} disabled={page === 1} className="bg-slate-600 p-3 text-white rounded-lg hover:bg-slate-400 disabled:opacity-50">Previous</button>
                <span className="p-3 border-b-2 rounded-lg bg-slate-300">Page {page} of {totalPages}</span>
                <button onClick={handleNext} disabled={page === totalPages} className="bg-slate-600 p-3 text-white hover:bg-slate-400 rounded-lg disabled:opacity-50">Next</button>
            </div>
        </>
    );
};

export default InternshipList;
