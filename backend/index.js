import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import UserModel from './models/model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json())
app.use("/auth",authRoute)


//MongoDB Connection

mongoose.connect(MONGO_URL)

mongoose.connection.on("connected",()=>{
    console.log("Successfully connected to MongoDB")
})

mongoose.connection.on("error",()=>{
    console.log("Not connected to MongoDB")
})



app.listen(PORT,()=>{
    console.log("Server is running on port: "+PORT)
})