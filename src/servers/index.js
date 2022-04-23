const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 8080;

var clientSocket = null;
var driverSocket = null


io.on('connection', socket => {
    console.log('User are connected');
    socket.on('notify_paiement', paymentData => {
        console.log(paymentData);
        clientSocket = socket;
        io.emit('driverRequest', driverPosition)
    });

    socket.on('userTyping', msg=> {
        clientSocket = socket;
        io.emit('userTyping', msg)
    })
});

server.listen( port, () => console.log('Server running on port:' + port ))

// const express = require("express");
// const app = express();
// const http = require("https");
// const WebSocket = require("ws");
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// wss.on("connection", function connection(ws) {
//   ws.on("message", function incoming(message, isBinary) {
//     console.log(message.toString(), isBinary);
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message.toString());
//       }
//     });
//   });
// });
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// server.listen(8080, () => {
//   console.log("Listening to port 8080");
// });