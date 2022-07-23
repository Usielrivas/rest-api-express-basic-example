import 'dotenv/config'
import './database/connectdb.js'
import express from "express";
import AuthRouter from "./routes/auth.route.js"
import {requireAuth} from './middlewares/requireAuth.js';

const app= express()
app.use(express.json())
app.use("/api/v1/auth",AuthRouter)

app.post("/api/v1/auth/test",requireAuth,(req,res)=>{
    res.json({ok:true})
})

const port= process.env.PORT || 5000
app.listen(port,()=>{
    console.log("Server on port 5000")
})
