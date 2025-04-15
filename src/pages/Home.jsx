import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Navbar } from "../components/ui/Navbar";

export const Home = () => {

  const navigate = useNavigate()

  const handelInternship = () => {
    navigate('/internshipForm')
  }

  const handelOfferLetter = () => {
    navigate('/offerletterForm')
  }

  const handleCourse = () => {
    navigate('/courseForm')
  }

  const handleExperience =() => {
    navigate('/experienceForm')
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap items-center justify-evenly max-h-full">
        <Button className="bg-slate-700 text-4xl mt-20 px-8 py-6  shadow-2xl border-collapse" onClick={handelInternship}>Internship Certificates</Button>

        <Button className="bg-slate-700 text-4xl mt-20 px-8 py-6  shadow-2xl border-collapse" onClick={handelOfferLetter}>OfferLetter Certificates</Button>
      </div>

      <div className="flex flex-wrap items-center justify-evenly max-h-full">
        <Button className="bg-slate-700 text-4xl mt-20 px-8 py-6 shadow-2xl border-collapse" onClick={handleCourse} >Course Certificates</Button>

        <Button className="bg-slate-700 text-4xl mt-20 px-8 py-6 shadow-2xl border-collapse" onClick={handleExperience} >Experience Certificates</Button>
      </div>
    </>
  );
};

