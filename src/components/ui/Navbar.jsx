import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
  const handlelogout = () =>{
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Redirect to login page
  }
  return (
    <nav className="bg-blue-600 text-white py-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl  font-bold">Certificate Generator</h1>
        <ul className="flex space-x-6">
          <li>
          </li>
          <li>
            <Link to="/internshipForm" className="hover:underline font-medium text-xl">
              Internship Certificates
            </Link>
          </li>
          <li>
            <Link to="/offerletterForm" className="hover:underline font-medium text-xl">
              OfferLetter Certificates
            </Link>
          </li>
          <li>
            <Link to="/courseForm" className="hover:underline font-medium text-xl">
              Course Certificates
            </Link>
          </li>
          <li>
            <Link to='/' className="hover:underline font-medium text-xl" onClick={handlelogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

