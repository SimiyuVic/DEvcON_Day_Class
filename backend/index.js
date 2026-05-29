import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import cors from "cors";
import cookierParser from "cookie-parser";

dotenv.config();
//create an express instance
const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}))

app.use(express.json());

app.use(cookierParser());

const PORT = process.env.PORT;

//user
app.use("/api/auth", authRoutes);

//admin
app.use("/api/admin", adminRoutes);


const startServer = async()=>{
    try
    {
        await connectDB();

    app.listen(PORT, ()=>{
        console.log(`Server listening to PORT ${PORT}`)
    })
    }
    catch(error)
    {
        console.log(error);
    }
}
startServer();


