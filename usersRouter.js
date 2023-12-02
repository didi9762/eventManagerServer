import express from "express";
import Allpersons from "./personsSchem.js";
import jwt from 'jsonwebtoken';
import verifyToken from "./verifi.js";
import AllEvents from "./eventsSchem.js";

const UsersRouter = express.Router()

UsersRouter.get('/getevents',verifyToken, async (req, res) => {
    try {
const userName = req.userName
        const user = await Allpersons.findOne({username:userName})

      const events = await AllEvents.find()
res.json({events:events.filter((event)=>event.persons.includes(userName)),user:user})
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
        const token = jwt.sign({ userName: userMatch.username }, 'eventmanager', { expiresIn: datauser.remember?'365d':'1h'});

        
    res.status(200).json({message:'correct',token:token})
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

UsersRouter.put ('/rate/:eventid',verifyToken,async(req,res)=>{
    const {eventid}= req.params
    const comment= req.body
    comment['eventId']=eventid
    comment['userName']=req.userName

    try{
        const rateList = await AllEvents.findById(eventid)
        const hasRated = rateList.rating.some((rate) => rate.userName === req.userName);
    if (hasRated) {
      return res.send('rated');
    }
      rateList.rating.push(comment);
        await rateList.save();
    

    }catch(e){console.log('error try save rating',e);}

})

  


export default UsersRouter