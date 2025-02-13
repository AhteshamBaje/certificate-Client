import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InternshipCertificate = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8003/api/data/${id}`);

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
    const { studentName = "", usn = "", course = "", startDate = "", endDate = "" , certificateNumber = "" } = formData || {};

    return (
        <>
        <div 
            style={{ backgroundImage: "url('/images/offerLetter.jpg')" }} 
            className="bg-contain bg-no-repeat w-[100vw] h-[100vh] bg-center flex flex-col"
        >

            <p className="p-10 pt-44 text-right">Date: {new Date().toLocaleDateString("en-IN")}</p>

            <p className="-mt-15 text-left "><strong>{certificateNumber}</strong></p>

            <p className="p-14 text-center font-bold">INTERNSHIP CERTIFICATE</p>

            <p className="p-4 pt-24 text-center">
                This is to certify that <strong>{studentName} </strong>, bearing <strong>[{usn}] </strong>, has successfully completed an internship in <strong>{course} </strong> at <strong>Five Seven I.T Solutions</strong> from  <strong>{new Date(startDate).toLocaleDateString("en-IN")} </strong> to <strong> {new Date(endDate).toLocaleDateString("en-IN")}</strong>.
            </p>
            <p className="p-4 text-center">
                During the internship, <strong>{studentName}</strong> actively participated in various data science projects, gaining hands-on experience in data analysis, machine learning, and statistical modeling. Their dedication, enthusiasm, and commitment to learning were commendable.
                We appreciate their efforts and contributions during the internship and wish them success in their future endeavors.
            </p>

            <img src="/images/sign.jpeg" alt="Signature" className="h-16 w-28 ml-10 mt-[30px]" />
            <img src="/images/seal.jpeg" alt="Company Seal" className="w-28 ml-[500px] -mt-[60px]" />

            <p className="ml-10 -mt-1 font-bold text-sm">Huma Fatima</p>
            <p className="ml-10 font-bold text-sm">Chief Executive Officer</p>
            <p className="ml-10 font-bold text-sm">Five Seven I.T Solutions</p>
        </div>

        <div>
            <button className='print:hidden ' onClick={()=>{window.print()}}>Download Certificate</button>
        </div>
        </>
    );
};

export default InternshipCertificate;
