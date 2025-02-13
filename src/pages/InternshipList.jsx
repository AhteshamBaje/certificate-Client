import axios from 'axios';
import React, { useEffect, useState } from 'react';

const InternshipList = () => {

    const [data , setData] = useState([]);

    useEffect(() =>{
        const fetchData = async () =>{
            try{
            const response = await axios.get("http://localhost:8003/api/studentlist")
            if(!data)
            {
                console.log("No data found.");
                return alert("No data found.");
            }
            console.log("Fetched data:", response.data.data);
            setData(response.data.data);
        }
        catch(error){
            console.log(error.message);
            alert("An error occurred while fetching the data.");
        }
        }
        fetchData();
    },[]
)

  return (
    <div>
          <div className="table">
        <table border={1}>
          <caption className="heading">Fetching data From API</caption>
          <thead>
            <tr>
              <th style={{border :"1px solid white" , color : "white", background: "black" , padding :"5px"}} >ID</th>
              <th style={{border :"1px solid white" , color : "white", background: "black" , padding :"5px"}}>Student Name</th>
              <th style={{border :"1px solid white" , color : "white", background: "black" , padding :"5px"}}>USN</th>
              <th style={{border :"1px solid white" , color : "white", background: "black" , padding :"5px"}}>COURSE</th>
              <th style={{border :"1px solid white" , color : "white", background: "black" , padding :"5px"}}>START DATE</th>
              <th style={{border :"1px solid white" , color : "white", background: "black" , padding :"5px"}}>END DATE</th>
              <th style={{border :"1px solid white" , color : "white", background: "black" , padding :"5px"}}>CERTIFICATE NUMBER</th>
              <th style={{border :"1px solid white" , color : "white", background: "black" , padding :"5px"}}></th>
              <th style={{border :"1px solid white" , color : "white", background: "black" , padding :"3px"}}></th>
            </tr>
          </thead>

          <tbody >
          {
                data.map((internships,index)=>
                {
                    return<tr key={index}>
                        <td style={{border :"1px solid black" , padding :"5px"}}>{internships._id}</td>
                        <td style={{border :"1px solid black" , padding :"5px"}}>{internships.studentName}</td>
                        <td style={{border :"1px solid black" , padding :"5px"}}>{internships.usn}</td>
                        <td style={{border :"1px solid black" , padding :"5px"}}>{internships.course}</td>
                        <td style={{border :"1px solid black" , padding :"5px"}}>{internships.startDate}</td>
                        <td style={{border :"1px solid black" , padding :"5px"}}>{internships.endDate}</td>
                        <td style={{border :"1px solid black" , padding :"5px"}}>{internships.certificateNumber}</td>
                        <th  style={{border :"1px solid black" , padding :"5px"}}>
                            <button className='bg-blue-600 border-none rounded-md text-white p-1' onClick={()=>updateinternships(internships)}>Update</button></th>
                        <th  style={{border :"1px solid black" , padding :"5px"}}>
                            <button className='bg-red-600 border-none rounded-md text-white p-1' onClick={()=>deleteinternships(internships._id)}>Delete</button></th>

                    </tr>
                }

                )
              }
          </tbody>
        </table>
    </div>
    </div>
  )
}

export default InternshipList;