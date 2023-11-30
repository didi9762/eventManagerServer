import express from 'express';
import Router from './router.js';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import UsersRouter from './usersRouter.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: ['http://localhost:5173',"http://localhost:4173"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }));
app.use(express.json());
app.use('/rout', Router);
app.use('/users',UsersRouter)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  