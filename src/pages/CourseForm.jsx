import React, { useState } from 'react'
import { Navbar } from '../components/ui/Navbar';
import { Link, useNavigate } from 'react-router';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import axios from 'axios';
import { getItem } from '../utils/localStorage.js';

function CourseForm() {
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const navigate = useNavigate();

    const user = getItem("certificate_user");

    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api3/courseForm', { studentName, email, title, startDate, endDate, user: user?._id });

            if (res.status === 200) {
                const resData = res.data;
                console.log(resData.message);c
                alert('Certificate details saved successfully!');

                navigate(`/CourseCertificate/${resData.Certificate._id}`)

                setStudentName("");
                setEmail("");
                setTitle("");
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
            <div className='mt-5 text-center'>
                <Link to="/courseList" className='hover:underline font-bold text-xl p-2 '>Course certificates Lists
                </Link>
            </div>
            <div className=' flex items-center justify-center min-h-screen px-4 sm:px-2'>
                <form className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6 space-y-4 m-4" >
                    <div>
                        <p className="flex items-center justify-center text-2xl font-bold " >Course Certificate </p>
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
                        <Label htmlFor="email">email</Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            aria-label=" student email"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title name "
                            aria-label="title"
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

                    <Button type="button" className="w-full px-4 py-2" onClick={handleDownload} >
                        Download Certificate
                    </Button>
                </form>
            </div>
        </>
    );
}

export default CourseForm;