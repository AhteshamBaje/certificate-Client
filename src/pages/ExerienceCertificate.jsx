import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import QRCode from "react-qr-code";

const ExpCertificate = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const flag = searchParams.get("flag");

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState();
  const navigate = useNavigate();

  const handleDownload = async (intern) => {
    try {
      window.print();

      await axios.put(`/api6/issuedDate/${id}`);
      console.log("issueExperienceDate");

    } catch (error) {
      console.error("Error saving issued date:", error);
      alert("Failed to update issued date in database");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api6/data/${id}`);

        if (!response.data.data) {
          navigate('/Invalidpage');
          console.log("No data found");
          return;
        }

        setFormData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (id) fetchData();
  }, [id]);
  // ✅ Safely handle formData in case it's null
  const {
    employeName = "",
    jobRole = "",
    startDate = "",
    responsibilities = "",
    endDate = "",
    ReferenceNumber = "",
  } = formData || {};

  const qr = `${import.meta.env.VITE_CLIENTURL}/experienceCertificate/${id}`;

  const handleSelectLocation = (location) => {
    setLocation(location);
    setLoading(false);
  }

  if (!flag) {
    return <>
      {formData && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate Verified!</h2>
            <p className="text-gray-600">The details for this certificate have been successfully verified.</p>
            <div className="mt-6 text-left border-t pt-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Certificate Details:</h3>
              <p className="text-gray-700"><span className="font-medium">Employee Name:</span> {employeName}</p>
              <p className="text-gray-700"><span className="font-medium">Job Role:</span> {jobRole}</p>
              <p className="text-gray-700"><span className="font-medium">Start Date:</span> {new Date(startDate).toLocaleDateString("en-IN")}</p>
              <p className="text-gray-700"><span className="font-medium">End Date:</span> {new Date(endDate).toLocaleDateString("en-IN")}</p>
              <p className="text-gray-700"><span className="font-medium">Reference Number:</span> {ReferenceNumber}</p>
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
          <>
            <div
              style={{
                backgroundImage: location === "Kalaburagi" ?
                  "url('/images/cmpnyLetter.png')"
                  :
                  "url('/images/CompanyBengaluru.jpeg')"
              }}
              className="bg-contain bg-no-repeat w-[100vw] h-[100vh] bg-center flex flex-col px-12 pt-[120px]"
            >
              <div className="flex justify-between">
                <p className="text-justify">
                  <strong>{ReferenceNumber}</strong>
                </p>
                <p className="text-justify">
                  <strong>Date: {new Date().toLocaleDateString("en-IN")}</strong>
                </p>
              </div>

              <p className="p-14 text-center font-bold font-serif text-2xl">EXPERIENCE LETTER</p>

              <div className=" text-lg m-2 text-justify">
                <p className=" pt-2">
                  This is to certify that <strong>{employeName} </strong> was employed
                  with Five Seven IT as a <strong>{jobRole}</strong> From <strong>{new Date(startDate).toLocaleDateString("en-IN")} </strong>{" "}
                  to <strong> {new Date(endDate).toLocaleDateString("en-IN")}</strong>.
                </p>

                <p className=" pt-2">
                  During their tenure with us, <strong>{employeName} </strong> was
                  responsible for <strong>{responsibilities}</strong>.
                  He/She demonstrated a high level of professionalism, dedication, and a
                  strong commitment to the responsibilities assigned. His/Her
                  contributions played a significant role in the success of several
                  projects.
                </p>
                <br></br>

                <p>
                  He/She exhibited excellent teamwork and communication skills, and
                  maintained a positive attitude in the workplace.
                  <strong>{employeName} </strong> was a valued member of our team, and
                  we truly appreciate his/her efforts and contributions. We
                  wish <strong>{employeName} </strong> all the best in his/her
                  future endeavors.
                </p>
              </div>

              <p className="ml-2">Sincerely,</p>
              <img
                src="/images/sign.jpeg"
                alt="Signature"
                className="h-16 w-28 ml-2 mt-[40px]"
              />
              {
                location === "Kalaburagi" && (
                  <img
                    src="/images/seal.jpeg"
                    alt="Company Seal"
                    className="w-28 ml-[500px] -mt-[70px]"
                  />
                )
              }

              <p className={location === "Kalaburagi" ? "ml-4 -mt-11 font-bold text-sm" : "ml-4 -mt-22 font-bold text-sm"}>Huma Fatima</p>
              <p className="ml-4 font-bold text-sm">Chief Executive Officer</p>
              <p className="ml-4 font-bold text-sm">Five Seven I.T Solutions</p>
            </div>

            <div className="mx-80 -mt-[300px] ">
              <QRCode value={qr} className="h-24 w-24" />
            </div>

            <div className="flex justify-center print:hidden mb-4">
              <Button onClick={handleDownload}>Download Certificate</Button>
            </div>

            <div className="flex justify-center mt-4 print:hidden">
              <Button onClick={() => navigate(-1)}>Back</Button>
            </div>

            <div className="ml-[450px] my-10">
              {" "}
              <strong>ID : {id}</strong>{" "}
            </div>
          </>
      }
    </>
  );
};

export default ExpCertificate;
