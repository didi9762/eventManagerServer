import express from "express";
import Allpersons from "./personsSchem.js";
import jwt from 'jsonwebtoken';
import verifyToken from "./verifi.js";
import AllEvents from "./eventsSchem.js";


const UsersRouter = express.Router()

UsersRouter.get('/getevents',verifyToken, async (req, res) => {
    try {
const userName = req.userName
        
      const events = await AllEvents.find()
res.send(events.filter((event)=>event.persons.includes(userName)))
    } catch (e) {
      console.error('Error trying to get events', e);
      res.status(500).send('Internal Server Error');
    }
  });


UsersRouter.post('/signin',async (req,res)=>{
    const datauser = req.body
    try{
        const userMatch = await Allpersons.findOne({username:datauser.userName})
        if(!userMatch){res.send('user name not correct');return}
        const passMatch = userMatch.password === datauser.password
        if(!passMatch){res.send('incorrect password');return}
        const token = jwt.sign({ userName: userMatch.username }, 'eventmanager', { expiresIn: '1h' });

        
    res.status(200).send(token)
    }catch(e){console.log('error try to log in',e);}
})

UsersRouter.post('/signup',async(req,res)=>{
    const datauser = req.body
    try{
        const userexsist = await Allpersons.findOne({username:datauser.username})
        if (userexsist) {
            res.status(122).send('user name exsist');return
        }
        const newuser = new Allpersons(datauser)
        const savepersn = await newuser.save()
        const token = jwt.sign({ userName: newuser.username }, 'eventmanager', { expiresIn: '1h' });
        res.status(200).send(token)
    }catch(e){console.log('error try add new user',e);}
})


  


export default UsersRouter