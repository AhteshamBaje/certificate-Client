import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Certificate Generator</h1>
        <ul className="flex space-x-6">
          <li>
          </li>
          <li>
            <Link to="/internshipForm" className="hover:underline font-bold text-xl">
                Internship Certificates
            </Link>
          </li>
          <li>
            <Link to="/offerletterForm" className="hover:underline font-bold text-xl">
              OfferLetter Certificates
            </Link>
          </li> 
          <li>
            <Link to="/CourseForm" className="hover:underline font-bold text-xl">
              Course Certificates
            </Link>
          </li>                                                                     
        </ul>
      </div>
    </nav>
  );
};

