import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import QRCode from "react-qr-code";

const CourseCertificate = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();


    const handledownload = async (intern) => {

        try {

            window.print();

            await axios.put(`/api3/issuedDate/${id}`);

      
            navigate(`/CourseCertificate/${formData._id}`);

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

    return (
        <>
            <div
                style={{ backgroundImage: "url('/images/offerLetter.jpg')" }}
                className="bg-contain bg-no-repeat w-[100vw] h-[100vh] bg-center flex flex-col px-12 pt-52"
            >

                <div className='flex justify-between'>
                    <p className="text-justify"><strong>{certificateNumber}</strong></p>
                    <p className="text-justify"><strong>Date: {new Date().toLocaleDateString("en-IN")}</strong></p>

                </div>

                <p className="p-14 text-center font-bold text-2xl">CERTIFICATE OF COMPLETION</p>

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
                <img src="/images/seal.jpeg" alt="Company Seal" className="w-28 ml-[500px] -mt-[50px]" />

                <p className="ml-4 font-bold text-sm">Huma Fatima</p>
                <p className="ml-4 font-bold text-sm">Chief Executive Officer</p>
                <p className="ml-4 font-bold text-sm">Five Seven I.T Solutions</p>
            </div>

            <div className="mx-80 -mt-[300px] ">
                <QRCode value={qr} className="h-24 w-24" />
            </div>

            <div className='flex justify-center print:hidden mb-4'>
                <Button onClick={handledownload}>Download Certificate</Button>
            </div>

            <div className="flex justify-center mt-4 print:hidden">
                <Button onClick={() => navigate(-1)}>Back</Button>
            </div>

            <div className="ml-[450px] my-10"> <strong>ID : {id}</strong> </div>
        </>
    );
};

export default CourseCertificate;
