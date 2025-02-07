import React, { useState } from 'react'


const internshipCertificate = () => {

    const [studentName, setStudentName] = useState("");
    const [course, setCourse] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate , setEndDate] = useState("")




    return (
        <>
            <div style={{ backgroundImage: "url('/images/offerLetter.jpg')" }} className="bg-contain bg-no-repeat w-[100vw] h-[100vh] bg-center flex  flex-col">
                <p className='p-10 pt-44 text-right'>Date: 29/01/2025</p>
                <p className='p-14 text-center font-bold'>INTERNSHIP COMPLETION CERTIFICATE</p>

                <p className='p-4 pt-24 text-center'>This is to certify that {studentName},\n bearing USN 3PD23SCS01, has successfully completed an internship in {course},\nData Science at Five Seven I.T     Solutions from {startDate} to {endDate}.
                    During the internship, Bhagya S Hadagalimath actively participated in various data science projects, gaining hands-on experience in data analysis, machine learning, and statistical modeling. Their dedication, enthusiasm, and commitment to learning were commendable.
                    We appreciate their efforts and contributions during the internship and wish them success in their future endeavors.
                </p>
                <img src="/images/sign.jpeg" alt="sign pic" srcset="" className='h-16 w-28 ml-10 mt-[30px]'/>
                <img src="/images/seal.jpeg" alt="seal pic" srcset="" className='h-20 w-28 ml-[500px] -mt-[60px]'/>
                <p className='ml-10  -mt-1 font-bold text-sm'>Huma Fatima</p>
                <p className='ml-10  font-bold text-sm'>Chief Executive Officer</p>
                <p className='ml-10  font-bold text-sm'>Five Seven I.T Solutions</p>
            </div>
        </>
    )
}

export default internshipCertificate