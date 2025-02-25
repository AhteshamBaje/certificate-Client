import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const OfferLetterList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();


    const searchEmploye = async () => {
        try {
            const searchEname = await axios.get(`http://localhost:8003/api2/searchdata2/${searchQuery}`);
            if(searchEname.data.success){
                setFilteredData(searchEname.data.data)
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const handlePrev = () => {
        setPage(page - 1);
    }

    const handleNext = () => {
        setPage(page + 1);
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8003/api2/OfferLetterList/${page}`);
            if (!response.data || response.data.data.length === 0) {
                console.log("No data found.");
                alert("No data found.");
                return;
            }
            console.log("Fetched data:", response.data.data);
            setData(response.data.data);
            setFilteredData(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching the data.");
        }
    };

    // Fetch data from API
    useEffect(() => {
        fetchData();
    }, [page]);


    // Delete Offer Letter
    const delEmploye = async (id) => {
        const confirm = window.confirm("Do you want to delete this offer letter?");
        if (!confirm) return;

        try {
            console.log({ id });
            const res = await axios.delete(`http://localhost:8003/api2/deleteOfferLeter/${id}`);

            if (res.status === 200) {
                alert("Offer letter deleted successfully");

                // Update state after deletion
                setData((prevData) => prevData.filter(offer => offer._id !== id));
                setFilteredData((prevData) => prevData.filter(offer => offer._id !== id));
            }
        } catch (error) {
            console.error("Error deleting offer letter:", error);
        }
    };

    return (
        <>
            {/* Navigation Bar */}
            <nav className="bg-blue-600 text-white text-center py-4 shadow-lg">
                <h1 className="text-2xl font-bold">OFFER LETTER LIST</h1>
                <ul className="container mx-auto flex flex-wrap justify-center sm:justify-between items-center px-4 sm:px-20 space-y-2 sm:space-y-0">
                    <li>
                        <Link to="/OfferLetterForm" className="hover:underline font-bold text-lg sm:text-xl">
                            Back
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:underline font-bold text-lg sm:text-xl">
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Search Bar */}
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        if(e.target.value===""){
                            fetchData()
                        }
                    }}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
                />
                <button className='bg-slate-500 text-white rounded-xl px-3' onClick={searchEmploye}>search</button>
            </div>

            {/* Offer Letter Table */}
            <div className="table-container flex justify-center items-center mx-10 py-5 overflow-x-auto">
                <table className="w-full max-w-5xl border-collapse">
                    <caption className="text-center font-bold text-2xl py-5">OFFER LETTERS</caption>
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
                        {filteredData.length > 0 ? (
                            filteredData.map((offer) => (
                                <tr key={offer._id} className="border hover:bg-gray-100">
                                    <td className="border p-2">{offer._id}</td>
                                    <td className="border p-2">{offer.name}</td>
                                    <td className="border p-2">{offer.email}</td>
                                    <td className="border p-2">{offer.salary}</td>
                                    <td className="border p-2">{offer.jobRole}</td>
                                    <td className="border p-2">{new Date(offer.startDate).toLocaleDateString("en-IN")}</td>
                                    <td className="border p-2">{offer.RefereneNo}</td>
                                    <td className="border p-2 flex space-x-2">
                                        <button
                                            className="bg-red-700 text-white hover:bg-red-400 px-2 py-1 rounded-md"
                                            onClick={() => delEmploye(offer._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-blue-700 text-white hover:bg-blue-400 px-2 py-1 rounded-md"
                                            onClick={() => navigate(`/OfferLetter/${offer._id}`)}
                                        >
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-between p-4'>
                <button type='button' className='bg-slate-600 px-2 text-white rounded-lg' onClick={handlePrev} disabled={page === 1 ? true : false} >previous</button>
                <p className='p-3 border-2 rounded-lg'>page {page} of {totalPages}</p>
                <button type='button' className='bg-slate-600 px-2 text-white rounded-lg' onClick={handleNext} disabled={page === totalPages ? true : false}>Next</button>
            </div>
        </>
    );
};

export default OfferLetterList;
