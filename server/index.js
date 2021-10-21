require('dotenv').config();
const express = require('express');
var cors = require('cors')
const axios = require('axios');
const pino = require('express-pino-logger')();

const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(pino);
app.use(cors())

app.use(express.static(__dirname + '/client/'));

app.get('/rotate',(req,res)=>{
  console.log("sending.............",req.body)
  io.emit("rotate",req.body)
  res.sendStatus(200)
})

app.get("/world",(req,res)=>{
  io.emit("world",req.body)
  res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected');
    
   

//     // socket.on("animateAvatar",sigml=>{
//     //     console.log("mssg from react",sigml)
//     //     io.emit("avatar",String(sigml))
//     // })
//     // socket.on('playStopped',()=>{
//     //     io.emit('playStopState')
    // })
  });
  

server.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);



