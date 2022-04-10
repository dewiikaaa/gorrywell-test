// import mongoose 
import mongoose from "mongoose";
 
//  Schema
const Ticket = mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    quota:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    event :{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Events'
    }

});

// export model
export default mongoose.model('Tickets', Ticket);