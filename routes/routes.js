import express from "express";

import {  
    saveLocation } from "../controllers/locationController.js";

import { 
    getEvents,
    saveEvent,
    getEventbyId,
    saveTicket } from "../controllers/eventController.js";

import { 
    getTransactionById, 
    getTransactionByCustomer,
    purchase } from "../controllers/transactionController.js";

const router = express.Router();

router.post('/event/create',saveEvent); 
router.post('/location/create', saveLocation);
router.post('/event/ticket/create', saveTicket);
router.get('/event', getEvents);
router.get('/event/get_info/:id', getEventbyId); 
router.post('/transaction/purchase', purchase); 
router.get('/transaction/get_info/:data', getTransactionByCustomer); 
//router.get('/transaction/get_info/:id', getTransactionById); 


// export router
export default router;