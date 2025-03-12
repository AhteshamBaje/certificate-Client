import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/ui/Navbar";

function OfferLetterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [startDate, setStartDate] = useState("");

  const navigate = useNavigate();

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8003/api2/offer", {
        name,
        email,
        salary,
        jobRole,
        startDate,
      });

      alert("Offer-Letter details saved successfully!");
      console.log(res);

      if (res.status === 200) {
        const resData = await res.data;
        console.log(resData.message);

        navigate(`/OfferLetter/${resData.newOfferStudents._id}`);

        setName("");
        setEmail("");
        setSalary("");
        setJobRole("");
        setStartDate("");
      }
    } catch (error) {
      console.error("Error saving Offer-Letter details:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      {/* Responsive Navigation */}
      <Navbar />
      <div className="mt-4">
        <Link to="/OfferLetterList" className='hover:underline font-bold text-xl p-2 m-20 '>Offer Letter Lists
        </Link>
      </div>

      {/* Responsive Form */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-0">
        <form className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6 space-y-4">
          {/* Name */}
          <div>
            <p className="flex items-center justify-center text-2xl font-bold" >Offer Letter </p>
            <Label htmlFor="Name">Name</Label>
            <Input
              id="Name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="w-full"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full"
            />
          </div>

          {/* Salary */}
          <div>
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter Salary"
              className="w-full"
            />
          </div>

          {/* Job Role */}
          <div>
            <Label htmlFor="jobRole">Job Role</Label>
            <Input
              id="jobRole"
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="Enter Job Role"
              className="w-full"
            />
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button type="button" className="w-full px-4 py-2" onClick={handleDownload}>
            Download Certificate
          </Button>
        </form>
      </div>
    </>
  );
}

export default OfferLetterForm;
