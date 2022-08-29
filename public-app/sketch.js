const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, {
    path: '/real-time'
});

let controllerX, controllerY = 0;
let interactions = 2;
let isTouched = false;

let screenMobile;

let screen_MB1;
let screen_MB2;
let screen_MB3;
let screen_MB4;
let screen_MB5;
let screen_MB6;


function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    background(0);
    screenMobile = 1;
    angleMode(DEGREES);

    socket.emit('device-size', {
        windowWidth,
        windowHeight
    });
    preloadImages();



    let btn3 = createButton("siguiente");
    btn2.mousePressed(function () {
        //DeviceOrientationEvent.requestPermission();
        //orderScreen(3);
        //btn1.hide();
        socket.emit('app-change-mupi-screen', screenMobile);
        screenMobile++;
        console.log("btn: ", btn2.style);
        btn2.style("display", 'none');
    });

    let btn2 = createButton("Siguiente");
    btn2.mousePressed(function () {
        //DeviceOrientationEvent.requestPermission();
        //orderScreen(3);
        //btn1.hide();
        socket.emit('app-change-mupi-screen', screenMobile);
        screenMobile++;
        console.log("btn: ", btn2.style);
        btn2.style("display", 'none');
    });


    let btn1 = createButton("Juega Ahora");
    btn1.mousePressed(function () {
        //DeviceOrientationEvent.requestPermission();
        //orderScreen(3);
        //btn1.hide();
        socket.emit('app-change-mupi-screen', screenMobile);
        screenMobile++;
        console.log("btn: ", btn1.style);
        btn1.style("display", 'none');
    });

   
}

function draw() {
    background(0, 5);
    displayScreens();
    /*newCursor(pmouseX, pmouseY);
    fill(255);
    ellipse(controllerX, controllerY, 50, 50);*/
}

/*function mouseDragged() {
    socket.emit('positions', { controlX: pmouseX, controlY: pmouseY });
}*/

function preloadImages() {

    screen_MB1 = loadImage('img/MB-screen1.png');
    screen_MB2 = loadImage('img/MB-screen2.png');
    screen_MB3 = loadImage('img/MB-screen3.png');
    screen_MB4 = loadImage('img/MB-screen4.png');
    screen_MB5 = loadImage('img/MB-screen5.png');
    screen_MB6 = loadImage('img/MB-screen6.png');

}

function displayScreens() {
    switch (screenMobile) {
        case 1:
            image(screen_MB1, 0, 0);
            break;

        case 2:
            image(screen_MB2, 0, 0);

            break;

        case 3: //Pantalla de juego
            image(screen_MB3, 0, 0);
            break;

        case 4:
            image(screen_MB4, 0, 0);
            break;

        case 5:
            image(screen_MB5, 0, 0);
            break;

        case 6:
            image(screen_MB6, 0, 0);
            break;

        default:
            break;
    }
}

function orderScreen(screenNumber) {
    socket.emit('screens', screenNumber);
}

function touchMoved() {
    switch (interactions) {
        case 0:
            socket.emit('mobile-instructions', {
                interactions,
                pmouseX,
                pmouseY
            });
            background(255, 0, 0);
            break;
    }
}

function changeScreen() {
    switch (interactions) {
        case 0:
            socket.emit('changeScreen', {
                screenMobile
            });
            //background(255, 0, 0);
            break;
    }
}

/*function touchStarted(){
    isTouched = true;
}

function touchEnded(){
    isTouched = false;
}*/

/*function deviceMoved() {
    switch (interactions) {
        case 1:
            socket.emit('mobile-instructions', { interactions, pAccelerationX, pAccelerationY, pAccelerationZ });
            background(0, 255, 255);
            break;
        case 2:
            socket.emit('mobile-instructions', { interactions, rotationX, rotationY, rotationZ });
            background(0, 255, 0);
            break;
    }
    
}*/

/*function deviceShaken() {
    //socket.emit('mobile-instructions', 'Moved!');
    //background(0, 255, 255);
}*/

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/*function newCursor(x, y) {
    noStroke();
    fill(255);
    ellipse(x, y, 10, 10);
}*/