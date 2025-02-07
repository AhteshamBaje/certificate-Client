import React, { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [fontSize, setFontSize] = useState(15); // Default font size
  const certificateRef = useRef(null);

  // Function to adjust font size dynamically
  useEffect(() => {
    const adjustFontSize = () => {
      let maxLength = 15; // Maximum character length before resizing
      let baseSize = 15; // Default font size in px

      if (name.length > maxLength || course.length > maxLength || date.length > maxLength) {
        setFontSize(15); // Reduce font size if text is too long
      } else {
        setFontSize(baseSize);
      }
    };

    adjustFontSize();
  }, [name, course , date]);

  const handleDownload = async () => {
    if (!name || !course || !date) {
      alert("All fields are required");
      return;
    }

    try {
      const input = certificateRef.current;
      const canvas = await html2canvas(input, { scale: 3 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");

      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${name}_certificate.pdf`);
    } catch (error) {
      console.log("Error generating PDF", error.message);
    }
  };

  return (
    <>
      <div className="w-full max-w-md space-y-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ direction: "ltr", textAlign: "left" }}
        />

        <Label htmlFor="course">Course Title</Label>
        <Input
          id="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <Label htmlFor="date">Completion Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div ref={certificateRef} className="">
        <div style={{ backgroundImage: "url('/images/offerLetter.jpg')" }} className="bg-cover bg-contain bg-no-repeat">



          <img src="/images/logo.jpg" alt="logo image" srcset="" className="h-28 p-8 mix-blend-multiply " />

          <div className="name-overlay p-2 flex flex-col justify-center items-center space-y-4 -m-16 ">
            <div className="flex flex-col justify-end ">
              <h1>
                Certificate of Completion
              </h1>
            </div>

            <p>
              This is to certify that
            </p>

            {/* Name Field with Dynamic Font Size and Wrapping */}
            <h2
              style={{
                fontSize: `${fontSize}px`,
                maxWidth: "400px",
                textAlign: "center",
                wordWrap: "break-word",
              }}
            >
              {name || "_______________"}
            </h2>

            <p className="text-sm text-center">
              has successfully completed the
            </p>

            {/* Course Field with Dynamic Font Size and Wrapping */}
            <h3
              className="text-center text-sm text-blue-700"
              style={{
                fontSize: `${fontSize}px`,
                maxWidth: "400px",
                textAlign: "center",
                wordWrap: "break-word",
              }}
            >
              {course || "_______________"}
            </h3>

            <p className="text-sm  text-center">
              course on
            </p>

            {/* Date Field with Proper Alignment */}
            <p
              className=" text-center"
              style={{
                fontSize: "20px",
                maxWidth: "300px",
                overflow: "hidden",
                textAlign: "center",
                maxHeight: "50px"
              }}
            >
              {date}
            </p>
          </div>
          <div className="text-sm   bg-yellow-100 w-[300px]">
            <p className="">
              FiveSeven IT Solutions Pvt
            </p>
          </div>
        </div>
        <Button className="name-overlay p-6 flex flex-col justify-center items-center " onClick={handleDownload}>Download Certificate</Button>
      </div>
      </>
  );
}
