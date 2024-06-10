//only file that runs in the backend

//1) dotenv

require('dotenv').config() // add environments variable to prcess.env
//require('dotenv').config() same as above

//2)import express

const express = require('express')

//3) import cors
const cors = require('cors')

//import router
const router = require('./router')

const connection = require('./db/connection')

//4) create server - express method used to create server

 const projectFairServer = express()

 //5) use cors to connect with frontend
 projectFairServer.use(cors())

 //6) json() - middleware - to convert json format to normal format
 projectFairServer.use(express.json())

 //server use router
 projectFairServer.use(router)
// first argument by which name the folder have to be called
//second argument - exporting the folder
 projectFairServer.use('/uploads', express.static('./uploads'))

 //7)customize port for the server

 const PORT = 3000|| process.env.PORT

 //8) Run the server
projectFairServer.listen(PORT,()=>{
    console.log(`project fair server running successfully at portnumber : ${PORT}`);
})


//get

projectFairServer.get('/',(req,res)=>{
    res.send('get request recieved')
})

