// import mongoose 
import mongoose from "mongoose";
 
 var dateValidator = function(date) {
  // `this` is the mongoose document
  return this.startDate <= date;
}

//  Schema
const Event = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true,
        validate: [dateValidator, 'Start Date must be less than End Date']
    },
    location :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Locations'
    },
    tickets : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Tickets'
        }
    ]
});
 
// export model
export default mongoose.model('Events', Event);