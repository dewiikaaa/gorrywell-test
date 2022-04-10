#Setup Enviroment
1. Database server is mongodb and it must have replica set
2. set your database configuration in config.env

#Project Setup
run command : nnpm install


#Insert dummy Data
run command : node seeder.js

#Run App
nrun command : npx nodemon app

#EndPoint
1. Create Event (POST)
	URL : /event/create
	sample parameter : 
	{
	   "name" : "Pelatihan Senam Kesehatan Jasmani untuk Tenaga Medis", 
	   "start" : "2022-03-31T17:00:00", 
	   "end" : "2022-04-01 17:00:00", 
	   "location" : ID_OF_LOCATION
	} 

	name, start, end are required
	location is optional

2. Create Location (POST)
	URL : /location/create
	sample parameter:
    {
        "name": "Stadion Mahanan",
        "city": "Solo",
        "country": "Indonesia",
        "lat": "-7.554983301188094",
        "long": "110.80657631534346",
     }

     name, city, country are required
     lat, long are optional

3. Create Ticket (POST)
	URL : /event/ticket/create
	Sample parameter:
	{
	    eventId : ID_OF_EVENT,
	    ticket : {
	            type: "GOLD,
	            quota:10,
	            price:100000
	        }
	}

	all parameters are required

4. Get Event (GET)
	Get spesific event by id => URL : /event/get_info/:id
	Get spesific all event => URL : /event

5. Purchase Ticket (POST)
	URL : /transaction/purchase
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
    all parameter are required

6. Transaction Detail (GET)
	URL : /transaction/get_info:/id

