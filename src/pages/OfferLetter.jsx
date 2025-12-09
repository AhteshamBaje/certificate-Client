import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "../components/ui/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import { checkIfNum } from "../utils/Datatypes";

const OfferLetter = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const flag = searchParams.get("flag");
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api2/data/${id}`);
        if (!res.data.data) {
          navigate('/Invalidpage');
          return;
        }
        setData(res.data.data);
      } catch (error) {
        alert("Error fetching data.");
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleDownload = async () => {

    try {
      window.print();

      await axios.put(`/api2/issuedDate/${id}`);
    } catch (error) {
      console.error("Error saving issued date:", error);
      alert("Failed to update issued date in database");
    }
  };

  const { name, salary, jobRole, startDate, RefereneNo } = data || {};

  const qr = `${import.meta.env.VITE_CLIENTURL}/OfferLetter/${id}`;

  const handleSelectLocation = (location) => {
    setLocation(location);
    setLoading(false);
  }

  if (!flag) {
    return <>
      {data && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate Verified!</h2>
            <p className="text-gray-600">The details for this certificate have been successfully verified.</p>
            <div className="mt-6 text-left border-t pt-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Certificate Details:</h3>
              <p className="text-gray-700"><span className="font-medium">Name:</span> {name}</p>
              <p className="text-gray-700"><span className="font-medium">Position:</span> {jobRole}</p>
              <p className="text-gray-700"><span className="font-medium">Joining Date:</span> {new Date(startDate).toLocaleDateString("en-IN")}</p>
              <p className="text-gray-700"><span className="font-medium">Reference No:</span> {RefereneNo}</p>
            </div>
          </div>
        </div>
      )}
    </>
  }

  return (
    <>
      {
        loading ?
          <>
            <div className="flex flex-col items-center justify-center m-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
              <p className="mt-6 text-xl font-semibold text-gray-700">Loading certificate data, Please select location...</p>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={() => handleSelectLocation("Kalaburagi")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                Kalaburagi
              </Button>
              <Button onClick={() => handleSelectLocation("Bangalore")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                Bangalore
              </Button>
            </div>

          </>
          :
          <div>
            <div
              ref={certificateRef}
              style={{
                backgroundImage: location === "Kalaburagi" ?
                  "url('/images/cmpnyLetter.png')"
                  :
                  "url('/images/CompanyBengaluru.jpeg')"
              }}
              className="bg-contain bg-center h-[100vh] flex flex-col bg-no-repeat"
            >
              <div className="p-10 pt-44 text-right">
                <strong>Date: {new Date().toLocaleDateString("en-IN")}</strong>
              </div>
              <div className="-mt-16 ml-4 text-left">
                <strong>REF: {RefereneNo}</strong>
              </div>
              <p className="p-14 text-center font-bold">OFFER LETTER</p>
              <div className="-mt-22 ml-4 text-left">To, {name}</div>
              <div className="ml-4 text-left">Subject: Offer for {jobRole}</div>
              <p className="p-4 text-justify">
                Dear <strong>{name}</strong>, We are pleased to extend to you the
                offer to join <strong>Five Seven I.T Solutions</strong> as a{" "}
                <strong>{jobRole}</strong>. Your skills and expertise have impressed
                us, and we are confident that you will make significant contributions
                to our team. Please find the details of the full-time position below:
                <br /><br />
                <strong>Position:</strong> {jobRole}
                <br />
                <strong>Salary:</strong> {checkIfNum(salary) ? `₹${salary} per month` : salary}
                <br />
                <strong>Joining Date:</strong> {new Date(startDate).toLocaleDateString("en-IN")}
                <br /><br />
                Your role as a {jobRole} will require you to take on various
                responsibilities and work closely with the team to achieve the
                company's goals. We believe this position will offer you many
                opportunities for growth and development. Please sign and return a
                copy of this letter as a confirmation of your acceptance. If you have
                any questions or concerns, feel free to contact us. We look forward to
                welcoming you to the team at Five Seven I.T Solutions. Best Regards,
              </p>
              <div className="w-28 ml-10 mt-5">
                <img src="/images/sign.jpeg" alt="sign" />
              </div>
              <div className="w-24 ml-[550px] -mt-[60px]">
                <img src="/images/seal.jpeg" alt="seal" />
              </div>
              <p className="ml-12 -mt-7 font-bold text-sm">Huma Fatima</p>
              <p className="ml-12 font-bold text-sm">Chief Executive Officer</p>
              <p className="ml-12 font-bold text-sm">Five Seven I.T Solutions</p>

            </div>

            <div className="mx-80 -mt-[285px] ">
              <QRCode value={qr} className="h-20 w-20" />
            </div>


            <div className="flex justify-center print:hidden">
              <Button onClick={handleDownload}>Download Certificate</Button>
            </div>

            {/* Hidden Back Button */}
            <div className="flex justify-center mt-2 print:hidden">
              <Button onClick={() => navigate(-1)}>Back</Button>
            </div>
            <div className="ml-[450px] my-6"> <strong>ID : {id}</strong> </div>
          </div>
      }
    </>
  );
};

export default OfferLetter;
