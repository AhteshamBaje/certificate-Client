import React from "react";
import {  useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const Home = () => {

    const navigate = useNavigate()

    const handelInternship = () => {
        navigate('/internshipForm')
    }

    const handelOfferLetter = () => {
        navigate('/offerletterForm')
    }

  return (
    <>
       <nav className="bg-blue-600 text-white text-center py-6 shadow-xl">
       <h1 className="text-2xl font-bold">Certificates Generator</h1>
       </nav>
    <div className="flex flex-col items-center justify-center">
       <Button className="bg-slate-700 flex flex-col text-4xl mt-20 px-10 py-8 ml-20 shadow-2xl border-collapse" onClick={handelInternship}>Internship Certificates</Button>

        <Button className="bg-slate-700 flex flex-col text-4xl mt-20 px-10 py-8 ml-20 shadow-2xl border-collapse" onClick={handelOfferLetter}>OfferLetter Certificates</Button>
    </div>
    </>
  );
};

