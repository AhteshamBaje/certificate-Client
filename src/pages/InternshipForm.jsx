import React, { useState } from 'react';
import { Label } from '../components/ui/Label.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Navbar } from '../components/ui/Navbar.jsx';

export const Form = () => {
    const [studentName, setStudentName] = useState("");
    const [usn, setUsn] = useState("");
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const navigate = useNavigate();

    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/internship', { studentName, usn, course, topic, startDate, endDate });
            alert('Certificate details saved successfully!');

            if (res.status === 200) {
                const resData = await res.data;
                console.log(resData.message);

                navigate(`/Internshipcertificate/${resData.certificate._id}`)

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
            <Navbar />
            <div className='mt-5 '>
                <Link to="/internshipList" className='hover:underline font-bold text-xl p-2 m-20 '>Internship certificates Lists
                </Link>
            </div>
            <div className=' flex items-center justify-center min-h-screen px-4 sm:px-2'>
                <form className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6 space-y-4 m-4" >
                    <div>
                        <p className="flex items-center justify-center text-2xl font-bold " >Internship Certificate </p>
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

                    <Button type="button" className="w-full px-4 py-2" onClick={handleDownload}>
                        Download Certificate
                    </Button>
                </form>
            </div>
        </>
    );
};
