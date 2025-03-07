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

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-h-full">
        <Button className="bg-slate-700 flex flex-col text-4xl mt-20 px-10 py-8 ml-20 shadow-2xl border-collapse" onClick={handelInternship}>Internship Certificates</Button>

        <Button className="bg-slate-700 flex flex-col text-4xl mt-20 px-10 py-8 ml-20 shadow-2xl border-collapse" onClick={handelOfferLetter}>OfferLetter Certificates</Button>

        <Button className="bg-slate-700 flex flex-col text-4xl mt-20 px-10 py-8 ml-20 mb-44 shadow-2xl border-collapse" onClick={handleCourse} >Course Certificates</Button>
      </div>
    </>
  );
};

