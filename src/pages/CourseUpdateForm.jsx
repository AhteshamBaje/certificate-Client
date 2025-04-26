import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import axios from 'axios';

function CourseUpdateForm() {
    
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const { id } = useParams();
    console.log(id);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`/api3/data/${id}`);
                const course = res.data.data;

                setStudentName(course.studentName || "");
                setEmail(course.email || "");
                setTitle(course.title || "");
                setStartDate(course.startDate ? course.startDate.slice(0, 10) : ""); // Format date
                setEndDate(course.endDate ? course.endDate.slice(0, 10) : "");
            } catch (error) {
                console.error("Error fetching course:", error);
                alert("Failed to load course data.");
            }
        };

        if (id) {
            fetchCourse();
        }
    }, [id]);


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api3/course/update/${id}`, { studentName, email, title, startDate, endDate });

            if (res.status === 200) {
                const resData = res.data;
                console.log(resData.message);
                alert('Certificate details updated successfully!');

                navigate('/courseList')

                setStudentName("");
                setEmail("");
                setTitle("");
                setStartDate("");
                setEndDate("");
            }



        } catch (error) {
            console.error('Error updating certificate details:', error);
            alert(error.response.data.message)
        }
    };



    return (
        <>
           
            <div className='mt-5 text-center'>
                <Link to="/courseList" className='hover:underline font-bold text-xl p-2 '>Course certificates 
                </Link>
            </div>
            <div className=' flex items-center justify-center min-h-screen px-4 sm:px-2'>
                <form className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6 space-y-4 m-4" >
                    <div>
                        <p className="flex items-center justify-center text-2xl font-bold " >Update Course Certificate </p>
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
                            disabled
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

                    <Button type="button" className="w-full px-4 py-2" onClick={handleUpdate} >
                        Update
                    </Button>
                </form>
            </div>
        </>
    );
}

export default CourseUpdateForm;