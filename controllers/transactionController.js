import mongoose from "mongoose";

// import models
import Transaction from "../models/Transaction.js";
import Ticket from "../models/Ticket.js";
import Customer from "../models/Customer.js";


/*
    function for purchasing ticket

    sample paramater:

    {
        "customer" :{
            "name" : "Dewi",
            "email" : "dewi@ika.com",
            "phone" : "6285612345678"
        },
        "items" :[
            {
            "qty" : 1,
            "ticket" : ID_OF_TICKET
            },
            {
            "qty" : 2,
            "ticket" : ID_OF_TICKET
            }
        ]
    }
*/

export const purchase = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        //step 1: check if customer data is exists by email or phone number
        //the priority is email address , when email address found although phone number is different we assume it was same customer
        let customerData = req.body.customer;
        let savedCustomer;

        savedCustomer = await Customer.findOne({"email": customerData.email});
        if(!savedCustomer){
            savedCustomer = await Customer.findOne({"phone": customerData.phone});
        }

        //save customer data as a new collection when data not found
        if(!savedCustomer){
            //customerData = new Customer(customerData);
            savedCustomer = await Customer.create([customerData], { session });
            savedCustomer = savedCustomer[0];
        }


        /*step 2 : check if ticket quota is available 
          transaction will abort when ticket quota less than total purchased ticket 
          transcation will continue with reducing remaining quota in ticket collections 

        */
        let items = req.body.items;
        let data;
        items.forEach( async (item) => {
          const ticket = await Ticket.findById(item.ticket);
          if(ticket.quota>item.qty){
            //reducing remaining quota here
            //console.log(ticket);
            await Ticket.findOneAndUpdate({ _id: item.ticket }, { $inc: { quota: (item.qty * -1) } }, { session });
          }else{
            await session.abortTransaction();
            res.status(400).json({message: ticket.type+" only available "+ticket.quota+" seat(s) but you wanna purchase "+item.qty+" seat(s)"});
          }
          
        });

        /*step 3 : insert transcation data */
        const transaction = {
            "trx_time" : Date.now(),
            "customer" : savedCustomer._id,
            "items"  : items
        };
        const savedTransaction = await Transaction.create([transaction], { session });
        console.log(savedTransaction);
        //console.log(savedTransaction[0]._id);


        /*step 4 : update customer data with ticket relation*/
        await Customer.findOneAndUpdate({_id: savedCustomer._id},{ $push: { transactions: savedTransaction[0]._id }}, { session });

        // Commit the changes
        await session.commitTransaction();
      } catch (error) {
        // Rollback any changes made in the database
        await session.abortTransaction();
        
        console.error(error);
        if (error.name === "ValidationError") {
            let message = "";
            for (var item of Object.keys(error.errors)) {
                    message+=", "+error.errors[item].message;
            }
            message = message.replace(/^,+|,+$/g, '');
            //error.errors.forEach( async (item) => {
              // await message.push(item.message);
            //});
            res.status(400).json({message:message});

        }else{
            res.status(400).json({message: error});
        }
        
      } finally {

        // Ending the session
        session.endSession();
        //const transaction = await Transaction.findById(req.params.id).populate('tickets').populate('customer');
        res.json({message: "Transaction Successfull"});
      }

} 

// function get single Transaction by id
export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('items.ticket').populate('customer');
        if(transaction){
            res.json(transaction);
        }else{
             console.log('not oke');
            res.status(200).json({message: "Data not found"});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
     
}

// function get single Transaction by email or phone number of customer
/*

    sample paramater:

    {
        "email" : "dewi@ika.com"
    }

    or

    {
        "phone" : "6285612345678"
    }

    if phone and email both available, email is the priority
*/


export const getTransactionByCustomer = async (req, res) => {
    console.log(req.params);
    try {
        let customer;
        if(req.params.data){
            customer = await Customer.findOne({"email":req.params.data});
            if(!customer)
                customer = await Customer.findOne({"phone":req.params.data});
        }else{
            res.status(200).json({message: "Need email or phone to find detail transaction"});
        }
        if(!customer){
            res.status(200).json({message: "email or phone not associated to any customer"});
        }

        const transaction = await Transaction.find({customer: customer._id}).populate('items.ticket').populate('customer');
        if(transaction){
            res.json(transaction);
        }else{
            res.status(200).json({message: "Data not found"});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
     
}
