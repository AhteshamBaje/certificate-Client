import { data } from "react-router";
import InternshipLetter from "../models/internshipLetter.model.js";
import Internship from "../models/internshipLetter.model.js";

const internship = async (req , res) => {
    try {
        const {studentName , usn ,  course , startDate , endDate} = req.body;
        
        if(!studentName || !usn || !course || !startDate || !endDate) 
            return res.status(401).json({success:false, message:"all fields required"});
        if(endDate < startDate )
            return res.status(400).json({success:false, message:"enter the correct date"});
        
        const usnExisted = await InternshipLetter.findOne({usn})
        if(usnExisted){
            return res.status(400).json({success:false, message:"usn already existed"});
        }
        
        
        const newInternshipStudents = new Internship({studentName , usn ,  course , startDate , endDate});
        await newInternshipStudents.save();
        
        return res.status(200).json({success:true, message:"Internship Certificate generated",certificate:newInternshipStudents})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error occured"})
    };
};

const internshipData = async (req , res) => {
    const {id} = req.params;

    // if(!id){
    //     return res.status(400).json({success:false, message:"internship ID is required"})
    // }
    // if(!mongoose.Types.ObjectId.isValidate(id)){
    //     return res.status(401).json({success:false, message:"Invalid internship ID"})
    // };

    try {
        const data = await InternshipLetter.findById(id);
        if(!id){
            return res.status(400).json({success:false, message:"not getting data to Internship form", error:error.message})
        }
        return res.status(200).json({success:true, message:"Data got in Internship form", data: data});
    } catch (error) {
        console.error("error fetching internship data",error);
        return res.status(400).json({success:false, message:"server error while fetchimg internship data"})
    }
    
};


const studentsList = async (req, res) => {
    try {
        const list = await InternshipLetter.find()
        if(!list){
            return res.status(402).json({success:false, message:"list not found"})
        }
        return res.status(200).json({success:true, message:"List found", data:list});
    } catch (error) {
        
    };
};


export {internship , internshipData , studentsList};