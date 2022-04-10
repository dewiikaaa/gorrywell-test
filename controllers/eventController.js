// import models
import mongoose from "mongoose";
import Event from "../models/Event.js";
import Location from "../models/Location.js";
import Ticket from "../models/Ticket.js";


 /*
function for create event
URL : event/create_event

sample parameter : 
{
   "name" : "Pelatihan Senam Kesehatan Jasmani untuk Tenaga Medis", 
   "start" : "2022-03-31T17:00:00", 
   "end" : "2022-04-01 17:00:00", 
   "location" : ID_OF_LOCATION
}

parameter of this function is object same as event model
object of "Event" has location , in this function location should be sent in the form of objectID from table location
We assume that location already inserted into "Location" collection
after successfull saving event, we gonna update  "Location" collection 
*/
export const saveEvent = async (req, res) => {
    
    const event = new Event(req.body);
    try {
        //step 1 : save event data
        const savedEvent = await event.save();

        if(savedEvent.location){
            let location = await Location.findOne({_id: savedEvent.location});
            location.events.push(savedEvent._id);
            location.save();
        }

        res.status(201).json(savedEvent);
    } catch (error) {
       res.status(400).json({message: error.message});
    }
    
}

// function get all Event
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('location').populate('tickets');
        if(events.length>0)
            res.json(events);
        else
            res.status(200).json({message: "Data not found"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
     
}

/*
function get single Event
URL
event/get_info/ID_OF_EVENT
    
parameter of this function is id of event
the return of the function is event with detail of location and detail of available ticket types

*/
export const getEventbyId = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('location').populate('tickets');
        if(event){
            res.json(event);
        }else{
             console.log('not oke');
            res.status(200).json({message: "Data not found"});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
     
}


/*
function Create Ticket

Sample parameter:
{
    eventId : ID_OF_EVENT,
    ticket : {
            type: "GOLD,
            quota:10,
            price:100000
        }
}

*/
export const saveTicket = async (req, res) => {
    try {
        let event = await Event.findById(req.body.eventId);
        let ticket = new Ticket(req.body.ticket);
        ticket.event = event._id;

        const savedTicket = await ticket.save();
        event.tickets.push(savedTicket._id);
        await event.save();

        res.status(201).json(savedTicket);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

