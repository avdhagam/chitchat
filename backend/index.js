import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from 'http';
import cors from "cors"
import connectToMongoDB from './db/connectToMongoDB.js';
import { addMsgToConversation } from "./controllers/msgs.controller.js";
import msgsRouter from "./routes/msgs.route.js"


const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        allowedHeaders: ["*"],
        origin: "*",
        allowedMethods: ["GET", "POST"]
    }
});

const userSocketMap = {};

/* io is an instance of the socket.io server class that is associated w
attached to the HTTP server */
io.on('connection', (socket) => {

    console.log("client connected");
    const username = socket.handshake.query.username;
    console.log('Username: ', username);

    userSocketMap[username] = socket;

    socket.on('chat msg', (msg) => {
        // Broadcast the message to other clients
        //socket.broadcast.emit('chat msg', msg);

        // Log the message details
        console.log("sender: ", msg.sender);
        console.log("receiver: ", msg.receiver);
        console.log("msg: ", msg.text);
        //socket.broadcast.emit('chat msg', msg);

        const receiverSocket = userSocketMap[msg.receiver]
        if (receiverSocket) {
            receiverSocket.emit('chat msg', msg);
        }
        addMsgToConversation([msg.sender, msg.receiver], {
            text: msg.text,
            sender: msg.sender,
            receiver: msg.receiver
        })
    });

})

app.use('/msgs', msgsRouter);




//dotenv library loads env variables from .env file to process.env

dotenv.config();
const port = process.env.PORT || 5000;
//use the port specified in env.PORT or use 5000

app.get('/', (req, res) => {
    res.send("congrats bros");
})



server.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is listening at http://localhost:${port}`);
})