const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const turnosController = require('./controllers/turnosController');

const app = express();
const server = http.Server(app);
const io = socketIO(server);


app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})


turnosController.configureSocket(io);


const PORT = 3000;
server.listen(PORT, () => console.log(`SERVER ON\nhttp://localhost:${PORT}`));

