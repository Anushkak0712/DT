require('dotenv').config()
var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const { MongoClient,ObjectId} = require('mongodb');
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = 'eventDatabase';

let db, collection;

// Connect to MongoDB
async function connectDB() {
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db(dbName);
  collection = db.collection('events');
}

connectDB().catch(console.error);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Appends the file extension
    }
  });
  
  const upload = multer({ storage: storage });

//create event
router.post('/events', upload.single('file'), async (req, res) => {
    try {
        const data=req.body;
        //console.log(data)
      const event = {...{uid:18,file:req.file},...data};
      const result = await collection.insertOne(event);
      res.status(201).send({ _id: result.insertedId ,file:req.file});
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  // Read Events
  router.get('/events', async (req, res) => {
    if (req.query.id){
      try {
        const { id } = req.query;
        //console.log(id)
        const event = await collection.findOne({ _id:new ObjectId(id) });
        if (event) {
          res.status(200).send(event);
        } else {
          res.status(404).send({ message: 'Event not found' });
        }
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    }
    else{
    
    try {
      const {type}=req.query
      const page=req.query.page||1;
      const limit=req.query.limit||5;
        const today = new Date().toISOString();
        const sort=type=='latest'?1:-1;
        // Find events with a schedule after today and sort by schedule in ascending order
        const events = await collection.find({  schedule: { $gt: today }})
                                       .sort({ schedule: sort })
                                       .toArray();
      res.status(200).send(events.slice((page-1)*limit,page*limit));
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
});
  

  
  // Update an Event by ID
  router.put('/events/:id',upload.single('file'), async (req, res) => {
    try {
      const { id } = req.params;
      const updatedEvent = req.body;
      //console.log(updatedEvent,id)
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedEvent }
      );
      if (result.matchedCount > 0) {
        res.status(200).send({ message: 'Event updated' });
      } else {
        res.status(404).send({ message: 'Event not found' });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  // Delete an Event by ID
  router.delete('/events/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount > 0) {
        res.status(200).send({ message: 'Event deleted' });
      } else {
        res.status(404).send({ message: 'Event not found' });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
module.exports=router
  /*
  {
"name": "e1",
"tagline": "A proper tag-line for the event",
"schedule": "2024-10-19T14:48:00.000Z",
"description": "String",
"moderator": "A user who is going to host",
"category": "category of the event",
"sub_category": "Sub category",
"rigor_rank": 5,
"attendees": ["a","b"]
}
*/ 