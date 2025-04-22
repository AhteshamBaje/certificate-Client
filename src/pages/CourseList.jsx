import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Navbar } from "../components/ui/Navbar";

const CourseList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [issuedStatus, setIssuedStatus] = useState({});

  const searchCourseStudent = async () => {
    try {
      const searchSname = await axios.get(`/api3/searchdata3/${searchQuery}`);
      if (searchSname.data.success) {
        setFilteredData(searchSname.data.data);
      } else {
        alert("No students found");
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
  const handleNext = () =>
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));

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
        setFilteredData((prevData) =>
          prevData.filter((intern) => intern._id !== id)
        );
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
        console.error("Error fetching total records:", error);
      }
    };
    fetchTotalRecords();
  }, []);

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
          className="bg-slate-400 text-white hover:bg-slate-600 rounded-xl px-3 ml-2"
          onClick={searchCourseStudent}
        >
          Search
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center px-4 mt-6">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="file"
            className="p-2 rounded-xl"
            onChange={handleFileChange}
          />
          <button
            className="p-2 rounded-2xl bg-slate-400 text-white hover:bg-slate-600"
            onClick={handleUpload}
          >
            Upload File
          </button>
        </div>

        <p className="mt-2 md:mt-0 font-bold text-green-700 text-lg">
          Total Records : {totalRecords}
        </p>
      </div>
      <div className="px-2 py-5 overflow-x-auto">
        <table className="w-full max-w-6xl mx-auto border-collapse">
          <caption className="text-center font-bold text-2xl py-5">
            COURSE CERTIFICATES
          </caption>
          <thead className="bg-black text-white text-base">
            <tr className="bg-black text-white text-base">
              <th className="border p-2">ID</th>
              <th className="border p-2">Student Name</th>
              <th className="border p-2">TITLE</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Certificate Number</th>
              <th className="border p-2">Issued Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((intern) => (
                <tr
                  key={intern._id}
                  className="border hover:bg-gray-100 text-sm"
                >
                  <td className="border p-2">{intern._id}</td>
                  <td className="border p-2">{intern.studentName}</td>
                  <td className="border p-2">{intern.title}</td>
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
                        navigate(`/CourseCertificate/${intern._id}`)
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
                      onClick={() => delCourse(intern._id)}
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
                      onClick={() => navigate(`/course/update/${intern._id}`)}
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
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between p-4">
        <button
          className="bg-slate-600 px-2 text-white rounded-lg hover:bg-slate-400"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Previous
        </button>
        <p className="p-3 border-b-2 rounded-lg">
          Page {page} of {totalPages}
        </p>
        <button
          className="bg-slate-600 px-2 text-white hover:bg-slate-400 rounded-lg"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default CourseList;
