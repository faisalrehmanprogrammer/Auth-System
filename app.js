const express = require('express');
const cors=require('cors');
const { databaseConnect } = require('./config/db');
const router = require('./routes/app-routes');
const dotenv=require('dotenv').config()
const PORT=process.env.PORT;

const app=express();
app.use(express.json())

databaseConnect()
app.use(cors())

app.use(router)

app.listen(PORT,()=>{
    console.log(`Server Running on:${PORT}`)
})