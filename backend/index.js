import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import formRouter from './routes/formRoute.js';


// create an app using express
const app = express();

// connect to database
await mongoose.connect(process.env.MONGO_URI);


// use middlewares
app.use(cors());
app.use(express.json());

// use routes
app.use(formRouter);


// listen for incoming requests
app.listen(3200, () => {
    console.log('App is listening on port 3200');
});
