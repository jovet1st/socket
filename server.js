const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(__dirname + '/client/'));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/client/index.html");
})

app.get("/chat", (req, res) =>{
    res.sendFile(__dirname + "/client/chat.html");
})

io.on("connection", (socket) =>{

    console.log("connected");

    socket.on("chat message", (message) =>{

        io.emit("chat message", message);

    });

    socket.on("disconnect", ()=>{
        console.log("disconnected");


    });


});


server.listen(4000, () =>{
    console.log("Server listening on PORT 4000");
});