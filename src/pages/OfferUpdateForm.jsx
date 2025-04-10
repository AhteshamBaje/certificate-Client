import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OfferUpdateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [startDate, setStartDate] = useState("");

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffer = async () => {
        try {
            const res = await axios.get(`/api2/data/${id}`);
            const UpdatedOffer = res.data.data; 
                       

            setName(UpdatedOffer.name || "");
            setEmail(UpdatedOffer.email || "");
            setSalary(UpdatedOffer.salary || "");
            setJobRole(UpdatedOffer.jobRole || "");
            setStartDate(UpdatedOffer.startDate ? UpdatedOffer.startDate.slice(0, 10) : ""); // Format date
        } catch (error) {
            console.error("Error fetching offer:", error);
            alert("Failed to load offer data.");
        }
    };

    if (id) {
        fetchOffer();
    }
}, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api2/updateOffer/${id}`, {
        name,
        email,
        salary,
        jobRole,
        startDate,
      });

      alert(" Offer-Letter details Updated successfully!");
      console.log(res);

      if (res.status === 200) {
        const resData = await res.data;
        console.log(resData.message);

        navigate(`/OfferLetterList`);

        setName("");
        setEmail("");
        setSalary("");
        setJobRole("");
        setStartDate("");
      }
    } catch (error) {
      console.error("Error updating Offer-Letter details:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      {/* Responsive Navigation */}
      <div className="mt-4 text-center">
        <Link to="/OfferLetterList" className='hover:underline font-bold text-xl p-2 '>Offer Letter Lists
        </Link>
      </div>

      {/* Responsive Form */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-0">
        <form className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6 space-y-4">
          {/* Name */}
          <div>
            <p className="flex items-center justify-center text-2xl font-bold" >Update Offer Letter </p>
            <Label htmlFor="Name">Name</Label>
            <Input
              id="Name"
              value={name}
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
              value={email}
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
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter Salary per month"
              className="w-full"
            />
          </div>

          {/* Job Role */}
          <div>
            <Label htmlFor="jobRole">Job Role</Label>
            <Input
              id="jobRole"
              value={jobRole}
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
              value={startDate}
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button type="button" className="w-full px-4 py-2" onClick={handleUpdate}>
            Update Certificate
          </Button>
        </form>
      </div>
    </>
  );
}

export default OfferUpdateForm;
