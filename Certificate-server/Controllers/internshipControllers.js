import InternshipLetter from "../models/internshipLetter.model.js";

const internship = async (req , res) => {
    try {
        const {studentName , usn ,  course , startDate , endDate} = req.body;
        
        if(!studentName || !usn || !course || !startDate || !endDate) 
            return res.status(401).json({success:false, message:"all fields required"});
        if(endDate < startDate )
            return res.status(400).json({success:false, message:"enter the correct date"})
        
        
        const newInternshipStudents = new InternshipLetter({studentName , usn ,  course , startDate , endDate});
        await newInternshipStudents.save();
        
        res.status(201).json({success:true, message:"Internship Certificate generated",data:newInternshipStudents})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error occured"})
    };
};


export default internship