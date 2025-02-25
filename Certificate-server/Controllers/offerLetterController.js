import { data } from "react-router";
import OFFER from "../models/offerLetterModel.js";

const OfferApi = async (req, res) => {
    try {
        const { name, email, salary, jobRole , startDate , endDate } = req.body;

        if (!name || !email || !salary || !jobRole || !startDate)
            return res.status(401).json({ success: false, message: "all fields required" });
        if (endDate < startDate)
            return res.status(400).json({ success: false, message: "enter the correct date" });

        const isEmailExisted = await OFFER.findOne({ email})
        if (isEmailExisted) {
            return res.status(400).json({ success: false, message: " Email already existed" });
        }

        const newOfferStudents = new OFFER({ name, email, salary, jobRole , startDate});
        await newOfferStudents.save();

        return res.status(200).json({ success: true, message: "Offer Letter Certificate generated",  newOfferStudents })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error occured" })
    };
};

const offerLetterData = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await OFFER.findById(id);
        if (!id) {
            return res.status(400).json({ success: false, message: "not getting data to Offer Letter form", error: error.message })
        }
        return res.status(200).json({ success: true, message: "Data got in Offer Letter form", data: data });
    } catch (error) {
        console.error("error fetching Offer Letter data", error);
        return res.status(400).json({ success: false, message: "server error while fetchimg Offer Letter data" })
    }

};

const offerLetterList = async (req, res) => {
    const {page} = req.params;
    const pageLimit = 4;
    typeof(page);

    const skipPage = (page-1) * pageLimit;
    console.log(skipPage);
    
    try {
        const totalDocuments = await OFFER.countDocuments();
        const totalPages = Math.ceil(totalDocuments / pageLimit);

        const list = await OFFER.find().skip(skipPage).limit(pageLimit);
        if (!list) {
            return res.status(404).json({ success: false, message: "list not found" })
        }
        return res.status(200).json({ success: true, message: "List found", data: list , totalPages });
    } catch (error) {
        return res.status(500).json({ success: false, message: "error occured from backend" })
    };
};

// Delete internship students ..
const deleteOfferLeter = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
        console.log({id});
        
        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        const del = await OFFER.findByIdAndDelete(id);
        if (!del) {
            return res.status(404).json({ success: false, message: "Offer Letter not found" });
        }

        return res.status(200).json({ success: true, message: "Offer Letter deleted successfully", data: del });
    } catch (error) {
        console.error("Error deleting Offer Letter:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//update internship students
const updateOfferLetter = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Get updated data from request body

        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        const updated = await OFFER.findByIdAndUpdate(id, updateData, { new: true });

        if (!updated) {
            return res.status(404).json({ success: false, message: "Offer Letter not found" });
        }

        return res.status(200).json({ success: true, message: "Offer Letter updated successfully", data: updated });
    } catch (error) {
        console.error("Error updating Offer Letter:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const searchData2 = async (req , res) => {
    const {Name} = req.params;
    try {
        const data = await OFFER.find({name:{$regex:Name , $options:"i" }});
        if(!data){
            return res.status(401).json({success:false , message:"Searchdata2 not found"});
        }
        return res.status(200).json({success:true, message:"searchdata2 Found", data})
    } catch (error) {
        console.error("error fetching searchdata2",error);
        return res.status(500).json({success:false , message:"Internal server error"});  
    };

}



export { OfferApi , offerLetterData , offerLetterList , deleteOfferLeter , updateOfferLetter , searchData2}