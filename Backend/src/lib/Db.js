import mongoose from "mongoose";
import { Env } from "./Env.js"; 

export const connectDb = async () =>{
    try{
     const conn =   await mongoose.connect(Env.Db_Url)
     console.log(conn.connection.host)
        console.log("Database Connected")
    }
    catch{
        console.error("There is an error in database creation")
    }
}