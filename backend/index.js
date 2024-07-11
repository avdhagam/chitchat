import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from 'http';
import cors from "cors"
import connectToMongoDB from './db/connectToMongoDB.js';
import { addMsgToConversation } from "./controllers/msgs.controller.js";
import msgsRouter from "./routes/msgs.route.js"
import { subscribe, publish } from "./redis/msgsPubSub.js";


dotenv.config();
const port = process.env.PORT || 5000;
//use the port specified in env.PORT or use 5000


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

    const channelName = `chat_${username}`
    subscribe(channelName, (msg) => {
        console.log('Received message:', msg);
        socket.emit("chat msg", JSON.parse(msg));
    })

    socket.on('chat msg', (msg) => {
        console.log(msg.sender);
        console.log(msg.receiver);
        console.log(msg.text);
        console.log(msg);
        const receiverSocket = userSocketMap[msg.receiver];
        if (receiverSocket) {
            //both sender and receiver are connected to same BE
            receiverSocket.emit('chat msg', msg);
        } else {
            // sender and receiver on diff BEs, so we need to use pubsub
            const channelName = `chat_${msg.receiver}`
            publish(channelName, JSON.stringify(msg));
        }

        addMsgToConversation([msg.sender, msg.receiver], {
            text: msg.text,
            sender: msg.sender,
            receiver: msg.receiver
        }
        )
    });

})

app.use('/msgs', msgsRouter);



app.get('/', (req, res) => {
    res.send("congrats bros");
})



server.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is listening at http://localhost:${port}`);
})