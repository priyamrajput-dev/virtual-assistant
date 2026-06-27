import express from "express";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import cookieParser from "cookie-parser"
import authRouter from "./routes/user.routes.js";
import cors from "cors"

const app = express();
app.use(cors({
    origin : ENV.FRONTEND_URL || "http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.json({ message: "Server working" });
});
//routes
app.use("/api/auth", authRouter);


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