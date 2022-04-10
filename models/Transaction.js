// import mongoose 
import mongoose from "mongoose";
 
//  Schema
const Transaction = mongoose.Schema({
    trx_time:{
        type: Date,
        required: true
    },
    customer :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customers'
    },
    items : [
        {
            qty:{
                type: Number,
                required: true,
                default: 1
            },
            ticket:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Tickets',
            }
        }
    ]
});
 
// export model
export default mongoose.model('Transactions', Transaction);