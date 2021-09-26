require('dotenv').config();
const express = require('express');
var cors = require('cors')
const axios = require('axios');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors())

app.use(express.static(__dirname + '/client/'));



io.on('connection', (socket) => {
    console.log('a user connected');
  
    
    app.get('/changeindex',(req,res)=>{
      socket.emit("finger_update",req.query.angle)
      res.send("Socket request sent with  " + req.query.angle)
    })

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



