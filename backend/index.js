import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from 'http';
import cors from "cors"


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

/* io is an instance of the socket.io server class that is associated w
attached to the HTTP server */
io.on('connection', (socket) => {

    console.log("client connected");
    const username = socket.handshake.query.username;
    console.log('Username: ', username);
    socket.on('chat msg', (msg) => {


        // Broadcast the message to other clients
        socket.broadcast.emit('chat msg', msg);

        // Log the message details
        console.log("sender: ", msg.sender);
        console.log("receiver: ", msg.receiver);
        console.log("msg: ", msg.text);
        //socket.broadcast.emit('chat msg', msg);
    });

})




//dotenv library loads env variables from .env file to process.env

dotenv.config();
const port = process.env.PORT || 5000;
//use the port specified in env.PORT or use 5000

app.get('/', (req, res) => {
    res.send("congrats bros");
})



server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})