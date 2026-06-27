import express from "express";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

const app = express();


const startServer = async()=>{
    try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log('Server is running on port:', ENV.PORT);
    });
  } catch (error) {
    console.error('💥 Error Starting the server', error);
  }
}

startServer();