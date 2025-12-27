import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import app from "./app.js"; // Import the app

dotenv.config();

app.use(cors());   // 
app.use(express.json());

const PORT = process.env.PORT || 5008;

const connect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        
        if (!connection) {
            console.log("Failed to connect to MongoDB");
        }
        
        console.log("Connected to MongoDB", connection.connection.host, connection.connection.name);
    } catch (error) {
        console.log(error);
    }
}



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connect();
});