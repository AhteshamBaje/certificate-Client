import React, { useState } from 'react'
import { Navbar } from '../components/ui/Navbar';
import { Link, useNavigate } from 'react-router';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import axios from 'axios';

function ExperienceForm() {
    const [employeName, setEmployeName] = useState("");
    const [email, setEmail] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const navigate = useNavigate();

    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api6/experienceForm', { employeName, email, jobRole, startDate, endDate });

            if (res.status === 200) {
                const resData = res.data;
                console.log(resData.message);
                alert('Certificate details saved successfully!');

                navigate(`/experienceList`)

                // setStudentName("");
                // setEmail("");
                // setTitle("");
                // setStartDate("");
                // setEndDate("");
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
                <Link to="/experienceList" className='hover:underline font-bold text-xl p-2 '>Experience certificates Lists
                </Link>
            </div>
            <div className=' flex items-center justify-center min-h-screen px-4 sm:px-2'>
                <form className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6 space-y-4 m-4" >
                    <div>
                        <p className="flex items-center justify-center text-2xl font-bold " >Experience Certificate </p>
                        <Label htmlFor="studentName">Name</Label>
                        <Input
                            id="employeName"
                            value={employeName}
                            onChange={(e) => setEmployeName(e.target.value)}
                            placeholder="Enter Employe Name"
                            aria-label=" Employe Name"
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
                        <Label htmlFor="title">Job Role</Label>
                        <Input
                            id="title"
                            value={jobRole}
                            onChange={(e) => setJobRole(e.target.value)}
                            placeholder="Enter job Role"
                            aria-label="jobRole"
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

export default ExperienceForm;