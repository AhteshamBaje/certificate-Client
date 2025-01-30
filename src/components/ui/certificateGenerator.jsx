import react from 'react'
import { useState, useRef } from "react";
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const certificateRef = useRef(null);

  const handleDownload = async () => {
    if (!name || !course || !date) {
      alert("All fields are required");
      return;
    }

    try {

      const input = certificateRef.current;
      const canvas = await html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('images/image.png');
        const pdf = new jsPDF('1', 'mm', 'a4');
        const imgWidth = 500;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${name}_certificate.pdf`)
      })

    } catch (error) {
      console.log(error.message);

    }
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <div className="w-full max-w-md space-y-4">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <Label>Course Title</Label>
        <Input value={course} onChange={(e) => setCourse(e.target.value)} />

        <Label>Completion Date</Label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div ref={certificateRef} className>
        <img src="/images/image.png" alt="certificate img" width={650} height={600} />

        <h1 className="text-2xl font-bold ">Certificate of Completion</h1>
        <p className="mt-2">This is to certify that</p>
        <h2 className="text-xl font-semibold ">{name || "[Your Name]"}</h2>
        <p>has successfully completed the</p>
        <h3 className="text-lg font-medium ">{course || "[Course Title]"}</h3>
        <p>on</p>
        <p className="font-medium ">{date || "[Completion Date]"}</p>
      </div>

      <Button onClick={handleDownload}>Download Certificate for better in future</Button>
    </div>
  );
}
