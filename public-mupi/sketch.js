const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, {
    path: '/real-time'
});
console.log('Server IP: ', NGROK);

let comidaMala = new ComidaMala();



let controllerX, controllerY = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;

//let ballSize = 20;

//pantallas
let screenNum;

let screen1;
let screen2;
let screen3;
let screen4;
let screen5;
let screen6;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    mupiWidth = windowWidth;
    mupiHeight = windowHeight;
    background(0);
    preloadImages();
    screenNum = 2;
}

function draw() {
    background(0, 5);
    displayScreens();
    /*newCursor(pmouseX, pmouseY);
    fill(255);
    ellipse(controllerX, controllerY, ballSize, ballSize);*/
}

function mouseDragged() {
    socket.emit('positions', {
        controlX: pmouseX,
        controlY: pmouseY
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function preloadImages() {

    screen1 = loadImage('img/MUPI-screen1.png');
    screen2 = loadImage('img/MUPI-screen2.png');
    screen3 = loadImage('img/MUPI-screen3.png');
    screen4 = loadImage('img/MUPI-screen4.png');
    screen5 = loadImage('img/MUPI-screen5.png');
    screen6 = loadImage('img/MUPI-screen6.png');

}

function displayScreens() {
    switch (screenNum) {
        case 1:
            image(screen1, 0, 0);
            break;

        case 2:
            image(screen2, 0, 0);
            break;

        case 3: //Pantalla de juego
            image(screen3, 0, 0);
            comidaMala.draw();
            break;

        case 4:
            image(screen4, 0, 0);
            break;

        case 5:
            image(screen5, 0, 0);
            break;

        case 6:
            image(screen6, 0, 0);
            break;

        default:
            break;
    }
}

function newCursor(x, y) {
    noStroke();
    fill(255);
    ellipse(x, y, 10, 10);
}

socket.on('mupi-instructions', instructions => {
    console.log('ID: ' + socket.id);

    let {
        interactions
    } = instructions;
    switch (interactions) {
        case 0:
            let {
                pmouseX, pmouseY
            } = instructions;
            controllerX = (pmouseX * mupiWidth) / deviceWidth;
            controllerY = (pmouseY * mupiHeight) / deviceHeight;
            console.log({
                controllerX,
                controllerY
            });
            break;
        case 1:
            let {
                pAccelerationX, pAccelerationY, pAccelerationZ
            } = instructions;
            ballSize = pAccelerationY < 0 ? pAccelerationY * -2 : pAccelerationY * 2;
            break;
        case 2:
            let {
                rotationX, rotationY, rotationZ
            } = instructions;
            controllerY = (rotationX * mupiHeight) / 90;
            controllerX = (rotationY * mupiWidth) / 90;
            break;
    }


});

socket.on('mupi-size', deviceSize => {
    let {
        windowWidth,
        windowHeight
    } = deviceSize;
    deviceWidth = windowWidth;
    deviceHeight = windowHeight;
    console.log(`User is using a smartphone size of ${deviceWidth} and ${deviceHeight}`);
    screenNum++;
});



socket.on('screens', (screenNumber) => {

    switch (screenNumber) {
        case 0:
            screenNum = 1;
            break;

        case 1:
            screenNum = 5;
            break;

        case 2:
            screenNum = 6;
            break;

        case 3:
            screenNum = 2;
            break;

        case 4:
            screenNum = 2;
    }
})