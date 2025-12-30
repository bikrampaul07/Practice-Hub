import mongoose from "mongoose";
import { Env } from "./Env.js"; 

export const connectDb = async () =>{
    try{
    if(!Env.Db_Url) throw new error ("Databse Url not found")
     const conn =   await mongoose.connect(Env.Db_Url)
     console.log(conn.connection.host)
        console.log("Database Connected")
    }
    catch{
        console.error("There is an error in database creation")
    }
}