import express from 'express'
import events from './data.js'


const Router = express.Router()

Router.get('/getevents',async(req,res)=>{
    try{
        res.send(events)

    }catch(e){console.log('error try get events',e);}
})



export default Router
