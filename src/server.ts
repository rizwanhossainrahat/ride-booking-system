import {Server} from "http";
import app from "./app";
import { envVars } from "./app/config/env";
import mongoose from "mongoose";

let server:Server;

const startServer=async()=>{
    try {
        await mongoose.connect(envVars.DB_URL,{
            serverSelectionTimeoutMS: 30000 
        })
        console.log(" connected to DB")
        
        server=app.listen(envVars.PORT,()=>{
            console.log(`server is listening on port ${envVars.PORT}`)
        })
    } catch (error) {
         console.log(error)
    }
}


(async()=>{
await startServer()

})()