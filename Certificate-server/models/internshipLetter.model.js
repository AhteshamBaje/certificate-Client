import mongoose, { Schema } from 'mongoose'

const Internship = new Schema({
    studentName : {
        type : String,
        required : true
    },
    usn : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date
    }
},
{
    timestamps:true
});

const InternshipLetter = mongoose.model("Internship", Internship);

export default InternshipLetter