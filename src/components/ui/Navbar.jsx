import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Certificate Generator</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline font-bold text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="/form" className="hover:underline font-bold text-xl">
              OfferLetter List
            </Link>
          </li>                                                                     
          <li>
            <Link to="/internshiplist" className="hover:underline font-bold text-xl">
                Internship List
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

