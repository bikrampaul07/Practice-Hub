
import express from "express"
import { Env } from "./src/lib/Env.js"
import { connectDb } from "./src/lib/Db.js"

const app=express()

app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"Success"
    })
})

let port=Env.Port

const server= async () =>{
    try{
        await connectDb();
        app.listen(port,()=>{
            console.log(`App is listening at post ${port}`)
        })
    }
    catch{
        console.error("there is an error in server")
    }
}
server()
