const express = require('express'); //llamando librerias de los endpoints
const { Server } = require('socket.io'); 
const PORT = 5050; // No cambiar
const SERVER_IP = '172.30.228.225'; // Cambiar por la IP del computador


const app = express(); //todo lo que use app está usando la libreria de express
app.use(express.json());
app.use('/app', express.static('public-app')); //están sirviendo los endopoints de manera estatica
app.use('/mupi', express.static('public-mupi')); //un endpoint es en una página el /algo...

const httpServer = app.listen(PORT, () => { //app listen es cuando activa el servidor. EL proyecto empieza a escuchar el puerto que le indicaron
    console.log(`http://${SERVER_IP}:${PORT}/app`);
    console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});
// Run on terminal: ngrok http 5050;

const io = new Server(httpServer, { path: '/real-time' }); //el socket abre un canal de comunicación entre el servidor y el cliente (entre ellos dos se comunican)
let times = 0; 
io.on('connection', socket => { //se le dice a la libreria que si alguien se conecta, se hace algo
    console.log(socket.id); //es el id de la conexión del socket
    socket.on('device-size', deviceSize => { //le podemos mandar al socket que llegan con un identificado (ej. deviceSize) 
        console.log(times) //dependiendo del identificador se hacen cosas diferentes
        socket.broadcast.emit('mupi-size', deviceSize);
        times ++;
    });

    socket.on('mobile-instructions', instructions => { //el socket on dice que si le llega al servidor un mensaje hace lo que nosotros queramos
        socket.broadcast.emit('mupi-instructions', instructions); 
    });

    socket.on('app-change-mupi-screen', screen => {
        console.log(`Screen: ${screen}`);
        socket.broadcast.emit('mupi-react-to-change', 1);
    });
});

//---------------------------- Database local 
let users = []; // user structure =  {name: ‘’, email: ‘’}


let usuarios = {};


//---------------------------- Endpoints del API

app.post('/send-user-data',(request, response) =>{ //creamos un API rest, es crear endpoints que podemos entrar desde nuestro cliente
//dependiendo de la información que se mande. El post crea información nueva en la DB
    usuarios = request.body; //se cambia la variable usuarios
    console.log('Post! from client', request.body);
});


app.get('/send-user-data',(request, response) =>{

    console.log("help");
    response.send(usuarios); //envia los datos. SI entramos a al ruta '/send-user-data' nos llegará el json de usuarios
});
