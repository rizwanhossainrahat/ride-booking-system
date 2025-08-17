import cors from "cors"
import  express, { Request, Response ,NextFunction} from "express";
import { router } from "./routes";
import { notFound } from "./app/middleware/notFound";
import {globalErrorHandler } from "./app/middleware/globalErrorHandler";


const app=express()

app.use(express.json())
app.use(cors())

app.use("/api/v1",router)

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome to ride management backend"
    })
})

app.use(globalErrorHandler)

app.use(notFound)

export default app;