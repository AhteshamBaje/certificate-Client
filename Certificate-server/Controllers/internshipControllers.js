import { data } from "react-router";
import InternshipLetter from "../models/internshipLetter.model.js";
import Internship from "../models/internshipLetter.model.js";

const internship = async (req, res) => {
    try {
        const { studentName, usn, course, topic , startDate, endDate } = req.body;

        if (!studentName || !usn || !course || !topic || !startDate || !endDate)
            return res.status(401).json({ success: false, message: "all fields required" });
        if (endDate < startDate)
            return res.status(400).json({ success: false, message: "enter the correct date" });

        const usnExisted = await InternshipLetter.findOne({ usn })
        if (usnExisted) {
            return res.status(400).json({ success: false, message: "usn already existed" });
        }


        const newInternshipStudents = new Internship({ studentName, usn, course, topic , startDate, endDate });
        await newInternshipStudents.save();

        return res.status(200).json({ success: true, message: "Internship Certificate generated", certificate: newInternshipStudents })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error occured" })
    };
};

const internshipData = async (req, res) => {
    const { id } = req.params;

    // if(!id){
    //     return res.status(400).json({success:false, message:"internship ID is required"})
    // }
    // if(!mongoose.Types.ObjectId.isValidate(id)){
    //     return res.status(401).json({success:false, message:"Invalid internship ID"})
    // };

    try {
        const data = await InternshipLetter.findById(id);
        if (!id) {
            return res.status(400).json({ success: false, message: "not getting data to Internship form", error: error.message })
        }
        return res.status(200).json({ success: true, message: "Data got in Internship form", data: data });
    } catch (error) {
        console.error("error fetching internship data", error);
        return res.status(400).json({ success: false, message: "server error while fetchimg internship data" })
    }

};

const studentsList = async (req, res) => {
    const {page} = req.params;
    const pageLimit = 4;

    const skipPage = (page-1) * pageLimit;
    console.log(skipPage);
    

    try {
        const totalDocuments = await InternshipLetter.countDocuments();
        const totalPages = Math.ceil(totalDocuments / pageLimit);

        const list = await InternshipLetter.find().skip(skipPage).limit(pageLimit);
        if (!list) {
            return res.status(402).json({ success: false, message: "list not found" })
        }
        return res.status(200).json({ success: true, message: "List found", data: list , totalPages});
    } catch (error) {
        return res.status(401).json({ success: false, message: "error occured from backend" })
    };
};

// Delete internship students ..
const deleteInternship = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        const del = await InternshipLetter.findByIdAndDelete(id);
        if (!del) {
            return res.status(404).json({ success: false, message: "Internship not found" });
        }

        return res.status(200).json({ success: true, message: "Internship deleted successfully", data: del });
    } catch (error) {
        console.error("Error deleting internship:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//update internship students
const updateInternship = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Get updated data from request body

        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        const updated = await InternshipLetter.findByIdAndUpdate(id, updateData, { new: true });

        if (!updated) {
            return res.status(404).json({ success: false, message: "Internship not found" });
        }

        return res.status(200).json({ success: true, message: "Internship updated successfully", data: updated });
    } catch (error) {
        console.error("Error updating internship:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const searchData = async (req , res) => {
    const {name} = req.params;
    try {
        const data = await InternshipLetter.find({studentName:{$regex:name , $options:"i"}});
        if(!data){
            return res.status(400).json({success:false , message:"searchData not found"});
        }
        return res.status(200).json({success:true , message:"searchData found", data})
    } catch (error) {
        console.error("error fetching searchData", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });

    }
}



export { internship, internshipData, studentsList, deleteInternship, updateInternship , searchData };