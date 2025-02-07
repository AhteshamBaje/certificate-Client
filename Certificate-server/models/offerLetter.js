import mongoose, { Schema } from 'mongoose'

const offerLetter = new Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    job : {
        type : String,
        require : true
    },
    Ref_No : {
        type : Number,
        require : true
    }
});

const OFFER = mongoose.model("offer" , offerLetter);

export default OFFER
 