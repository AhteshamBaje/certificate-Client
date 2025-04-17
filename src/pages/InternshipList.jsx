import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Navbar } from '../components/ui/Navbar';

const InternshipList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [issuedStatus, setIssuedStatus] = useState({});

    const fetchTotalRecords = async () => {
        try {
            const res = await axios.get('/api/totalRecords');
            if (res.status === 200) {
                setTotalRecords(res.data.totalRecords);
            }
        } catch (err) {
            console.error('Error fetching total records:', err);
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
            alert('Error fetching student data.');
        }
    };

    useEffect(() => {
        fetchData();
        fetchTotalRecords();
    }, [page]);

    const searchStudent = async () => {
        if (!searchQuery.trim()) {
            fetchData();
            return;
        }
        try {
            const res = await axios.get(`/api/searchdata/${searchQuery}`);
            if (res.data.success) {
                setFilteredData(res.data.data);
            } else {
                alert('No students found.');
            }
        } catch (err) {
            console.error(err);
            alert('Error searching student.');
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0] || null);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        try {
            const buffer = await selectedFile.arrayBuffer();
            const workbook = XLSX.read(buffer, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

            const existingUSNs = new Set(data.map(item => item.usn));
            const newRecords = jsonData.filter(item => !existingUSNs.has(item.usn));

            if (newRecords.length === 0) {
                alert('No new records to upload.');
                return;
            }

            const res = await axios.post('/api/internship/upload', { jsonData: newRecords }, {
                headers: { 'Content-Type': 'application/json' }
            });

            alert(res.data.message);
            fetchData();
            fetchTotalRecords();
        } catch (err) {
            console.error(err);
            alert('Upload failed.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;

        try {
            const res = await axios.delete(`/api/delIntern/${id}`);
            if (res.status === 200) {
                alert('Record deleted successfully.');
                setFilteredData(prev => prev.filter(item => item._id !== id));
                fetchTotalRecords();
            }
        } catch (err) {
            alert('Failed to delete.');
        }
    };

    const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setPage(prev => (prev < totalPages ? prev + 1 : prev));

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Search by student name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
                />
                <button
                    className="bg-slate-400 text-white hover:bg-slate-600 rounded-xl px-3 ml-2"
                    onClick={searchStudent}
                >
                    Search
                </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center px-4 mt-6">
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <input type="file" className="border p-2 rounded-xl" onChange={handleFileChange} />
                    <button className="bg-slate-400 text-white hover:bg-slate-600 p-2 rounded-xl" onClick={handleUpload}>Upload File</button>
                </div>
                <p className="font-bold text-green-700 text-lg mt-2 md:mt-0">Total Records: {totalRecords}</p>
            </div>

            <div className="overflow-x-auto py-5 px-2">
                <table className="w-full border-collapse max-w-6xl mx-auto">
                    <caption className="text-center font-bold text-2xl py-5">INTERNSHIP CERTIFICATES</caption>
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
                            filteredData.map(intern => (
                                <tr key={intern._id} className="hover:bg-gray-100 text-sm text-center">
                                    <td className="border p-2">{intern._id}</td>
                                    <td className="border p-2">{intern.studentName}</td>
                                    <td className="border p-2">{intern.usn}</td>
                                    <td className="border p-2">{intern.course}</td>
                                    <td className="border p-2">{new Date(intern.startDate).toLocaleDateString("en-IN")}</td>
                                    <td className="border p-2">{new Date(intern.endDate).toLocaleDateString("en-IN")}</td>
                                    <td className="border p-2">{intern.certificateNumber}</td>
                                    <td className="border p-2 text-green-700">
                                        {intern.issuedDate ? new Date(intern.issuedDate).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        }) : <span className="text-gray-400">Not issued</span>}
                                    </td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <button onClick={() => navigate(`/Internshipcertificate/${intern._id}`)} className="hover:text-green-600">
                                            🧾
                                        </button>
                                        <button onClick={() => navigate(`/Internship/Update/${intern._id}`)} className="hover:text-blue-600">
                                            ✏️
                                        </button>
                                        <button onClick={() => handleDelete(intern._id)} className="hover:text-red-600">
                                            🗑️
                                        </button>
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

            <div className="flex justify-between items-center px-6 py-4">
                <button onClick={handlePrev} disabled={page === 1} className="bg-slate-600 text-white px-3 py-1 rounded disabled:opacity-50">Previous</button>
                <span className="text-lg">Page {page} of {totalPages}</span>
                <button onClick={handleNext} disabled={page === totalPages} className="bg-slate-600 text-white px-3 py-1 rounded disabled:opacity-50">Next</button>
            </div>
        </>
    );
};

export default InternshipList;
