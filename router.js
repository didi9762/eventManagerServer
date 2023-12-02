import express from 'express';
import mongoose from 'mongoose';
import AllEvents from './eventsSchem.js';
import Allpersons from './personsSchem.js';
import verifyToken from './verifi.js';
import axios from 'axios';


const Router = express.Router();




Router.get('/getevents', async (req, res) => {
    try {
      const events = await AllEvents.find()

      res.send(events);
    } catch (e) {
      console.error('Error trying to get events', e);
      res.status(500).send('Internal Server Error');
    }
  });
   

Router.get('/getevent/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await AllEvents.findOne({ _id: id });
    res.send(event);
  } catch (e) {
    console.log('Server error getting event by ID:', e);
    res.status(500).send('Internal Server Error');
  }
});

Router.get('/getmap/:eventid',async (req,res)=>{
try{
    const {eventid} = req.params

    console.log(eventid);
    const currentEvent =await AllEvents.findOne({_id:eventid})
    if(!currentEvent.latitude||!currentEvent.longtude){res.send('no location');console.log('no:',currentEvent.latitude);return}
    const apiKey = process.env.API_KEY
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${currentEvent.latitude},${currentEvent.longtude}&zoom=15&size=400x400&key=${apiKey}`;

    const response = await axios.get(mapUrl, { responseType: 'arraybuffer' });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(Buffer.from(response.data, 'binary'));
  } catch (error) {
    console.error('Error fetching map:', error);
    res.status(500).send('Internal Server Error');
  }
});


Router.put('/saveplace', verifyToken, async (req, res) => {
    const eventData = req.body.eventData;
    try {
      const  userName  = req.userName;
      const exsistList = await AllEvents.findById(eventData)
      const user = await Allpersons.findOne({username:userName})
      if(exsistList.persons.includes(userName)){res.send('already exist');return}
     if(exsistList.persons.length===exsistList.places){res.send('full');return}
     if(exsistList.minAge>user.age){res.send('age limited');return}
    const saveplace = await AllEvents.findOneAndUpdate(
    {_id:eventData},
    {$push:{persons:userName}},
    {new:true}
    )
      res.status(200).send('Place saved successfully');
    } catch (error) {
      console.error('Error saving place:', error);
      res.status(500).send('Internal Server Error');
    }
  });



export default Router;
