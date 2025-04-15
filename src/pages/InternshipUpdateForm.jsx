import React, { useEffect, useState } from 'react';
import { Label } from '../components/ui/Label.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

export const InternshipUpdateForm = () => {
    const [studentName, setStudentName] = useState("");
    const [usn, setUsn] = useState("");
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { id } = useParams();
    console.log(id);

    const navigate = useNavigate();

     useEffect(() => {
            const fetchIntern = async () => {
                try {
                    const res = await axios.get(`/api/data/${id}`);
                    const intern = res.data.data;
    
                    setStudentName(intern.studentName || "");
                    setUsn(intern.usn || "");
                    setCourse(intern.course || "");
                    setTopic(intern.topic || "");
                    setStartDate(intern.startDate ? intern.startDate.slice(0, 10) : ""); // Format date
                    setEndDate(intern.endDate ? intern.endDate.slice(0, 10) : "");
                } catch (error) {
                    console.error("Error fetching intern:", error);
                    alert("Failed to load intern data.");
                }
            };
    
            if (id) {
                fetchIntern();
            }
        }, [id]);
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api/updateIntern/${id}`, { studentName, usn, course, topic, startDate, endDate });
            alert('Internship Certificate details updated successfully!');

            if (res.status === 200) {
                const resData = await res.data;
                console.log(resData.message);

                navigate(`/InternshipList`)

                setStudentName("");
                setUsn("");
                setCourse("");
                setTopic("");
                setStartDate("");
                setEndDate("");
            }



        } catch (error) {
            console.error('Error saving certificate details:', error);
            alert(error.response.data.message)

        }
    };

    return (
        <>
            
            <div className='mt-4 text-center'>
                <Link to="/InternshipList" className='hover:underline font-bold text-xl p-2  '>Internship certificates Lists
                </Link>
            </div>
            <div className=' flex items-center justify-center min-h-screen px-4 sm:px-2'>
                <form className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6 space-y-4 m-4" >
                    <div>
                        <p className="flex items-center justify-center text-2xl font-bold " >Update Internship Certificate </p>
                        <Label htmlFor="studentName">Name</Label>
                        <Input
                            id="studentName"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Enter student Name"
                            aria-label=" student Name"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="usn">USN</Label>
                        <Input
                            id="usn"
                            value={usn}
                            onChange={(e) => setUsn(e.target.value)}
                            placeholder="Enter usn"
                            aria-label=" student usn"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="course">Course Title</Label>
                        <Input
                            id="course"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder="Enter course title"
                            aria-label="Course Title"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="topic">Topics Covered</Label>
                        <Input
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Enter topics "
                            aria-label="topic"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            aria-label="startDate"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            aria-label="endDate"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <Button type="button" className="w-full px-4 py-2" onClick={handleUpdate}>
                        Update
                    </Button>
                </form>
            </div>
        </>
    );
};
