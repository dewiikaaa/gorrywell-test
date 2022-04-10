// import mongoose 
import mongoose from "mongoose";
 
//  Schema
const Location = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    lat:{
        type: String,
        required: false
    },
    long:{
        type: String,
        required: false
    },
    events : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Events'
        }
    ]
});
 
// export model
export default mongoose.model('Locations', Location);