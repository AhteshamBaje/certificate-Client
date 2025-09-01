import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";

const OfferLetter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  const [data, setData] = useState(null);

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

  if (!data) return <div>Loading...</div>;

  const { name, salary, jobRole, startDate, RefereneNo } = data;

  const qr = `${import.meta.env.VITE_CLIENTURL}/OfferLetter/${id}`;


  return (
    <div>
      <div ref={certificateRef} className="bg-[url(/images/cmpnyLetter.png)] bg-contain bg-center h-[100vh] flex flex-col bg-no-repeat">
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
          <strong>Salary:</strong> ₹{salary} per month
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
  );
};

export default OfferLetter;
