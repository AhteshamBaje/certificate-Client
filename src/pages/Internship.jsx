import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import QRCode from 'react-qr-code';

const InternshipCertificate = () => {
    const { id } = useParams();
    console.log(id);

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState();
    const navigate = useNavigate();

    const handledownload = async () => {
        try {

            window.print();

            await axios.put(`/api/issuedDate/${id}`);

        } catch (error) {
            console.error("Error saving issued date:", error);
            alert("Failed to update issued date in database");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/data/${id}`);
                if (!response.data.data) {
                    navigate('/Invalidpage');
                    return;
                }
                setFormData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                navigate('/Invalidpage');
            }
        };

        if (id) fetchData();
    }, [id, navigate]);

    const {
        studentName = '',
        usn = '',
        course = '',
        topic = '',
        startDate = '',
        endDate = '',
        certificateNumber = '',
    } = formData || {};

    const qr = `${import.meta.env.VITE_CLIENTURL}/Internshipcertificate/${id}`;

    const handleSelectLocation = (location) => {
        setLocation(location);
        setLoading(false);
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
                            className="bg-contain bg-no-repeat w-[100vw] h-[100vh] bg-center flex flex-col px-12 pt-52">
                            <div className='flex justify-between'>
                                <p className="text-justify font-semibold">{certificateNumber}</p>
                                <p className="text-justify font-semibold">
                                    Date: {new Date().toLocaleDateString("en-IN")}
                                </p>
                            </div>

                            <p className="p-14 text-center font-bold text-2xl">INTERNSHIP CERTIFICATE</p>

                            <p className="text-justify pt-14">
                                This is to certify that <strong>{studentName}</strong>, bearing USN <strong>{usn}</strong>,
                                has successfully completed an internship in <strong>{course}</strong> at
                                <strong> Five Seven I.T Solutions</strong> from
                                <strong> {new Date(startDate).toLocaleDateString("en-IN")}</strong> to
                                <strong> {new Date(endDate).toLocaleDateString("en-IN")}</strong>.
                            </p>

                            <br /><br />

                            <p className="text-justify">
                                During the internship, <strong>{studentName}</strong> actively participated in various
                                <strong> {course}</strong> projects, gaining hands-on experience in <strong>{topic}</strong>.
                                Their dedication, enthusiasm, and commitment to learning were commendable.
                                We appreciate their efforts and contributions during the internship and wish them success in their future endeavors.
                            </p>

                            <img src="/images/sign.jpeg" alt="Signature" className="h-16 w-28 ml-2 mt-[60px]" />
                            <img src="/images/seal.jpeg" alt="Company Seal" className="w-28 ml-[500px] -mt-[58px]" />

                            <p className="ml-5 -mt-10 font-bold text-sm">Chief Executive Officer</p>
                            <p className="ml-5 font-bold text-sm">Five Seven I.T Solutions</p>
                            <p className="ml-5  font-bold text-sm">Huma Fatima</p>
                        </div>

                        <div className="mx-80 -mt-[350px]">
                            <QRCode value={qr} className="h-24 w-24" />
                        </div>

                        <div className='flex justify-center print:hidden mb-4'>
                            <Button onClick={handledownload}>Download Certificate</Button>
                        </div>

                        <div className="flex justify-center mt-4 print:hidden">
                            <Button onClick={() => navigate(-1)}>Back</Button>
                        </div>

                        <div className="ml-[450px] my-14">
                            <strong>ID: {id}</strong>
                        </div>
                    </>
            }
        </>
    );
};

export default InternshipCertificate;
