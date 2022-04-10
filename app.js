import express from "express";
import mongoose from "mongoose";
import route from "./routes/routes.js";
import cors from "cors";
import dotenv  from "dotenv"
dotenv.config({ path:'./config.env' })

const app = express();
 
mongoose.connect(process.env.DB_URI,{ 
    readPreference: 'primary'
    //useNewUrlParser: true,
    //useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));
 
// middleware 
app.use(cors());
app.use(express.json());
app.use('/',route);
 

// listening to port
app.listen('3000',()=> console.log('Server Running at port: 3000'));