import React from "react";
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {

  const navigate = useNavigate();
  const [menu, setMenu] = React.useState(false);

  const handlelogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Redirect to login page
  }


  return (
    <>
      <nav className={`bg-blue-600 text-white py-6 shadow-lg hidden lg:block `}>
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

            </li>
          </ul>
          <button className="bg-white text-blue-600 pb-1 px-2 rounded-md hover:underline font-medium text-xl" onClick={handlelogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* mobile nav */}
      <nav className="flex  justify-between px-2 bg-blue-600 text-white py-6 shadow-lg lg:hidden">
        <h1 className="text-2xl  font-bold">Certificate Generator</h1>
        <div onClick={() => setMenu(!menu)} className="flex flex-col gap-1 hover:cursor-pointer">
          <span className="w-[30px] h-1 bg-white"></span>
          <span className="w-[30px] h-1 bg-white"></span>
          <span className="w-[30px] h-1 bg-white"></span>
        </div>


      </nav>
      {
        menu ? <>
          <div className=" bg-blue-600 text-white border-2 w-[260px] p-4 absolute right-0 rounded-md  ">
            <ul className="flex flex-col ">
              <li>
                <Link to="/internshipForm" className="pb-2 hover:underline font-medium text-xl">
                  Internship Certificates
                </Link>
              </li>
              <li>
                <Link to="/offerletterForm" className="pb-2 hover:underline font-medium text-xl">
                  OfferLetter Certificates
                </Link>
              </li>
              <li>
                <Link to="/courseForm" className="pb-2 hover:underline font-medium text-xl">
                  Course Certificates
                </Link>
              </li>
              <li>
                <button className="bg-white text-blue-600 mt-3 pb-1 px-2 rounded-md hover:underline font-medium text-xl" onClick={handlelogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </> : <></>
      }

    </>

  );
};

