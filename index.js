const express = require('express');
const { Server } = require('socket.io');
const PORT = 5050; // No cambiar
const SERVER_IP = '172.30.228.225'; // Cambiar por la IP del computador

//const os = require('os');
//const IPaddress = os.networkInterfaces().en0[1].address;

const app = express();
app.use(express.json());
app.use('/app', express.static('public-app'));
app.use('/mupi', express.static('public-mupi'));

const httpServer = app.listen(PORT, () => {
    console.log(`http://${SERVER_IP}:${PORT}/app`);
    console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});
// Run on terminal: ngrok http 5050;

const io = new Server(httpServer, { path: '/real-time' });
let times = 0; 
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('device-size', deviceSize => {
        console.log(times)
        socket.broadcast.emit('mupi-size', deviceSize);
        times ++;
    });

    socket.on('mobile-instructions', instructions => {
        socket.broadcast.emit('mupi-instructions', instructions);
    });

    socket.on('user-data', data => {
        socket.broadcast.emit('mupi-recieve-data', data);
    });

    socket.on('app-change-mupi-screen', screen => {
        console.log(`Screen: ${screen}`);
        socket.broadcast.emit('mupi-react-to-change', 1);
    });
});


