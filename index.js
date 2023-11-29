import express from 'express';
import Router from './router.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: ['https://project-jerusalem-2.vercel.app','http://localhost:5173',"http://localhost:4173","https://jlm-specs-2.vercel.app"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }));
app.use('/rout', Router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  