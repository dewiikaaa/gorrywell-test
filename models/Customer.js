// import mongoose 
import mongoose from "mongoose";
 
 var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
//  Schema
const Customer = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    phone:{
        type: String,
        required: true
    },
    transactions : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Transactions'
        }
    ]
});
 
// export model
export default mongoose.model('Customers', Customer);