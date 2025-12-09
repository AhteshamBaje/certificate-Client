import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import QRCode from "react-qr-code";

const CourseCertificate = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const flag = searchParams.get("flag");

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState();
    const navigate = useNavigate();


    const handledownload = async () => {

        try {

            window.print();

            await axios.put(`/api3/issuedDate/${id}`);

        } catch (error) {
            console.error("Error saving issued date:", error);
            alert("Failed to update issued date in database");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api3/data/${id}`);

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
    const { studentName = "", title = "", startDate = "", endDate = "", certificateNumber = "" } = formData || {};

    const qr = `${import.meta.env.VITE_CLIENTURL}/CourseCertificate/${id}`;

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
                            <p className="text-gray-700"><span className="font-medium">Student Name:</span> {studentName}</p>
                            <p className="text-gray-700"><span className="font-medium">Course:</span> {title}</p>
                            <p className="text-gray-700"><span className="font-medium">Start Date:</span> {new Date(startDate).toLocaleDateString("en-IN")}</p>
                            <p className="text-gray-700"><span className="font-medium">End Date:</span> {new Date(endDate).toLocaleDateString("en-IN")}</p>
                            <p className="text-gray-700"><span className="font-medium">Certificate Number:</span> {certificateNumber}</p>
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
                            className="bg-contain bg-no-repeat w-[100vw] h-[100vh] bg-center flex flex-col px-12 pt-52"
                        >

                            <div className='flex justify-between'>
                                <p className="text-justify"><strong>{certificateNumber}</strong></p>
                                <p className="text-justify"><strong>Date: {new Date().toLocaleDateString("en-IN")}</strong></p>

                            </div>

                            <p className="p-14 text-center font-bold font-serif  text-2xl">CERTIFICATE OF COMPLETION</p>

                            <div className='text-center text-lg m-2'>
                                <p className=" pt-2">This is to certify that </p>

                                <p className=" pt-2"><strong>{studentName} </strong>,</p>

                                <p className=" pt-2">has successfully completed  the </p>
                                <p className=" pt-2"><strong>{title} Course </strong></p>
                                <p className=" pt-2">Offered by </p>
                                <p className=" pt-2"><strong>Five Seven I.T EDUCATIONAL INSTITUTIONS & MANAGEMENT</strong> </p>
                                <p className=" pt-2">From  <strong>{new Date(startDate).toLocaleDateString("en-IN")} </strong> to <strong> {new Date(endDate).toLocaleDateString("en-IN")}</strong>.</p>
                                <br /> <br />
                            </div>

                            <img src="/images/sign.jpeg" alt="Signature" className="h-16 w-28 ml-2 mt-[20px]" />
                            <img src="/images/seal.jpeg" alt="Company Seal" className="w-28 ml-[500px] -mt-[65px]" />

                            <p className="ml-4 -mt-10 font-bold text-sm">Huma Fatima</p>
                            <p className="ml-4 font-bold text-sm">Chief Executive Officer</p>
                            <p className="ml-4 font-bold text-sm">Five Seven I.T Solutions</p>
                        </div>

                        <div className="mx-80 -mt-[325px] ">
                            <QRCode value={qr} className="h-24 w-24" />
                        </div>

                        <div className='flex justify-center print:hidden mb-4'>
                            <Button onClick={handledownload}>Download Certificate</Button>
                        </div>

                        <div className="flex justify-center mt-4 print:hidden">
                            <Button onClick={() => navigate(-1)}>Back</Button>
                        </div>

                        <div className="ml-[450px] my-14"> <strong>ID : {id}</strong> </div>
                    </>
            }
        </>
    );
};

export default CourseCertificate;
