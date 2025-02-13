import React from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Link }  from "react-router-dom";

function OfferLetterForm() {
  return (

     <>
            <nav className="bg-blue-600 text-white text-center py-6 shadow-lg">
                <h1 className="text-2xl font-bold  ">Offer-Letter Certificate Generator</h1>
                <ul className="container mx-auto flex justify-between items-center px-4">
                    <li>
                        <Link to="/" className="hover:underline font-bold text-xl">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/internshiplist" className="hover:underline font-bold text-xl">
                            Offer-Letter List
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className=' flex items-center justify-center'>
                <form className="w-full max-w-md space-y-4 p-4 pt-10" >
                    <div>
                        <Label htmlFor="Name">Name</Label>
                        <Input
                            id="Name"
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Enter student Name"
                            aria-label="Name"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">email</Label>
                        <Input
                            id="emsail"
                            onChange={(e) => setUsn(e.target.value)}
                            placeholder="Enter email"
                            aria-label=" email"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="salary">Salary</Label>
                        <Input
                            id="salary"
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder="Enter salary"
                            aria-label="salary"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="job role">Job Role</Label>
                        <Input
                            id="job role"
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder="Enter job role"
                            aria-label="job role"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            id="startDate"
                            type="date"
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
                            onChange={(e) => setEndDate(e.target.value)}
                            aria-label="endDate"
                            style={{ direction: "ltr", textAlign: "left" }}
                        />
                    </div>

                    <Button type="button" className="px-4 py-2" >
                        Download Certificate
                    </Button>
                </form>
            </div>
        </>
)
}

export default OfferLetterForm