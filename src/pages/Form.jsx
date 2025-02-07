import React, { useState } from 'react';
import { Label } from '../components/ui/Label.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import axios from 'axios';

export const Form = () => {
    const [studentName, setStudentName] = useState("");
    const [usn, setUsn] = useState("");
    const [course, setCourse] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleDownload = async () => {
        const certificateText = `Certificate of Completion\n\nThis is to certify that ${studentName}\nhas successfully ${usn} completed the course:\n${course}\non ${startDate} ${endDate}.`;
        try {
            const res = await axios.post('http://localhost:8003/api/internship', { studentName, usn, course, startDate, endDate });
            alert('Certificate details saved successfully!');

            if (!res.ok) {
                return res.status(400).json({ success: false, message: "Failed to save certificate details" })
            }

            const blob = new Blob([certificateText], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${studentName}_certificate.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert('Certificate details saved successfully!');
            console.log("details save to the database");
            
        } catch (error) {
            console.error('Error saving certificate details:', error);
        }
    };

    return (
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

                <Button type="submit" className="p-6 m-2o">
                    Save Certificate
                </Button>
                <button type="button" className="p-6 m-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleDownload}>
                    Download Certificate
                </button>
            </form>
        </div>
    );
};
