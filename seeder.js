import mongoose from "mongoose";
import Location from "./models/Location.js";
import Event from "./models/event.js";
import Ticket from "./models/ticket.js";

import dotenv  from "dotenv"
dotenv.config({ path:'./config.env' })

 
mongoose.connect(process.env.DB_URI,{ 
    readPreference: 'primary'
});

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));
 
const seedEvent = 
  {
    "name": "Pelatihan Senam Kesehatan Jasmani untuk Tenaga Medis",
    "start": new Date("2022-04-01 00:00:00"),
    "end": new Date("2022-04-02 00:00:00"),
  };


const seedLocation = 
  {
    "name": "Stadion Mahanan",
    "city": "Solo",
    "country": "Indonesia",
    "lat": "-7.554983301188094",
    "long": "110.80657631534346",
  };

const seedCustomer = 
  {
      "name" : "Dewi",
      "email" : "dewi@ika.com",
      "phone" : "6285612345678"
  };


const seedTickets = [
  {
    "type" : "SILVER",
    "quota" : 100,
    "price"  : 200000
  },
  {
    "type" : "GOLD",
    "quota" : 50,
    "price"  : 500000
  },
  {
    "type" : "PLATINUM",
    "quota" : 20,
    "price"  : 1000000
  },
];




const seedDB = async()=>{
  const savedLocation = await Location.create(seedLocation);
  const savedEvent = await Event.create(seedEvent);
  
  
  await Event.findOneAndUpdate({_id: savedEvent._id}, {location: savedLocation._id});
  await Location.findOneAndUpdate({_id: savedLocation._id},{ $push: { events: savedEvent._id } });

  /*
  savedEvent.location = savedLocation._id;
  //savedEvent.save();
  */

  const savedTickets = await Ticket.insertMany(seedTickets);
  const savedTicketIds = savedTickets.map(a => a._id);
  await Event.findOneAndUpdate({_id: savedEvent._id}, { $push: { tickets: savedTicketIds }});
  //console.log(savedTickets);

}

seedDB().then(()=>{
  db.close();
});