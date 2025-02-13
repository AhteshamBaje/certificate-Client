import React, { useState } from 'react';
import { Label } from '../components/ui/Label.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link }  from "react-router-dom";

export const Form = () => {
    const [studentName, setStudentName] = useState("");
    const [usn, setUsn] = useState("");
    const [course, setCourse] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const navigate = useNavigate();

    const handleDownload = async (e) => {
        e.preventDefault();
        const certificateText = `Certificate of Completion\n\nThis is to certify that ${studentName}\nhas successfully ${usn} completed the course:\n${course}\non ${startDate} ${endDate}.`;
        try {
            const res = await axios.post('http://localhost:8003/api/internship', { studentName, usn, course, startDate, endDate });
            alert('Certificate details saved successfully!');

            if (res.status === 200) {
                const resData = await res.data;
                console.log(resData.message);

                navigate(`/Internshipcertificate/${resData.certificate._id}`)

                setStudentName("");
                setUsn("");
                setCourse("");
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
            <nav className="bg-blue-600 text-white text-center py-6 shadow-lg">
                <h1 className="text-2xl font-bold  "> Internship Certificate Generator</h1>
                <ul className="container mx-auto flex justify-between items-center px-4">
                    <li>
                        <Link to="/" className="hover:underline font-bold text-xl">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/InternshipList" className="hover:underline font-bold text-xl">
                            Internship List
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className=' flex items-center justify-center'>
                <form className="w-full max-w-md space-y-4 p-4 pt-10" >
                    <div>
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
                        <Label htmlFor="endDate">Start Date</Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            aria-label="endDate"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <Button type="button" className="px-4 py-2" onClick={handleDownload}>
                        Download Certificate
                    </Button>
                </form>
            </div>
        </>
    );
};
