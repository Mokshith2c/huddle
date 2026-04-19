import express from "express";
import {createServer} from "node:http";
import { connectToSocket } from "./controllers/socketManager.js";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
app.set("port", (process.env.PORT || 8080));
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://10.180.142.72:5173", "http://10.180.142.72:8080"],
    credentials: true
}));
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}))

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api/v1/users", userRoutes);
app.get("/home", (req, res)=>{
    return res.json({"hello":"World"})
});

const start = async() => {
    const connectionDb = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), ()=>{
        console.log("Listening on port 8080");
    })
}

start();