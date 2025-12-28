
import express from "express"
import { Env } from "./src/lib/Env.js"

const app=express()

app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"Success"
    })
})

let port=Env.Port
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})