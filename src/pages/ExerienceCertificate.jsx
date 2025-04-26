import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import QRCode from "react-qr-code";

const ExpCertificate = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState(null);
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

  const qr = `${import.meta.env.VITE_CLIENTURL}/ReferenceNumber/${id}`;

  return (
    <>
      <div
        style={{ backgroundImage: "url('/images/offerLetter.png')" }}
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
            responsible for <strong>{responsibilities}</strong> .
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
          className="h-16 w-28 ml-2 mt-[20px]"
        />
        <img
          src="/images/seal.jpeg"
          alt="Company Seal"
          className="w-28 ml-[500px] -mt-[50px]"
        />

        <p className="ml-4 -mt-11 font-bold text-sm">Huma Fatima</p>
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
  );
};

export default ExpCertificate;
