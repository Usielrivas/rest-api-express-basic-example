import 'dotenv/config'
import './database/connectdb.js'
import express from "express";

const app= express()
app.get('/',(req,res)=>{
    res.json({ok:true})
})


const port= process.env.PORT || 5000
app.listen(port,()=>{
    console.log("Server on port 5000")
})
