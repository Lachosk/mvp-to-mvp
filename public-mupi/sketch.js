const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, {
    path: '/real-time'
});
console.log('Server IP: ', NGROK);

let badFood = [];
let goodFood = [];

let puntos;

let dogBowl = {
    x: 0,
    y: 0,

};



let lostGame = false;

let controllerX, controllerY = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;


//pantallas
let screenNum;

let screen1;
let screen2;
let screen3;
let screen4;
let screen5;
let screen6;
let meat;
let bowl;
let chicken;
let carrot;
let salmon;
let grapes;
let avocado;
let chocolate;
let onion;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    mupiWidth = windowWidth;
    mupiHeight = windowHeight;

    dogBowl.x = 300;
    dogBowl.y = 730;

    puntos = 0;

    background(0);
    preloadImages();

   

    screenNum = 1;
}

function draw() {
    background(0, 5);
    displayScreens();
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
    bowl = loadImage('img/bowl.png');
    meat = loadImage('img/carne.png');
    chicken = loadImage('img/pollo.png');
    carrot = loadImage('img/zanahoria.png');
    salmon = loadImage('img/salmon.png');
    grapes = loadImage('img/grapes.png');
    avocado = loadImage('img/avocado.png');
    chocolate = loadImage('img/chocolate.png');
    onion = loadImage('img/onion.png');

}


function createFood() {
    if (frameCount % 360 === 0) {
        let randomFood = int(random(1,4));
        console.log(randomFood);
        switch (randomFood) {
            case 1:
                badFood.push(new ComidaMala(random(1, 590), -10, avocado))
                break;
            case 2:
                badFood.push(new ComidaMala(random(1, 590), -10, grapes))
                break;
            case 3:
                badFood.push(new ComidaMala(random(1, 590), -10, chocolate))
                break;
            case 4:
                badFood.push(new ComidaMala(random(1, 590), -10, onion))
                break;
        
            default:
                break;
        }
        
    }

    if (frameCount % 240 === 0) {
        let randomFood = int(random(1,4));
        switch (randomFood) {
            case 1:
                goodFood.push(new ComidaBuena(random(1, 590), -10, meat))
                break;
            case 2:
                goodFood.push(new ComidaBuena(random(1, 590), -10, chicken))
                break;
            case 3:
                goodFood.push(new ComidaBuena(random(1, 590), -10, carrot))
                break;
            case 4:
                goodFood.push(new ComidaBuena(random(1, 590), -10, salmon))
                break;
        
            default:
                break;
        }
        
    }
}

function paintFood() {
    
    if(badFood != null){
        for (let i = 0; i < badFood.length; i++) {
            badFood[i].draw();
            badFood[i].move();
            
        }
    }
    
    if(goodFood != null){
        for (let i = 0; i < goodFood.length; i++) {
            goodFood[i].draw();
            goodFood[i].move();
        }
    
    }

    
}

function paintDogBowl() {
    //fill(255);
    imageMode(CENTER);
    image(bowl, controllerX,620,80,80);
    /*rectMode(CENTER);
    rect(controllerX, 620,60,60);*/

}

function removeFood() {

    
    for (let i = 0; i < badFood.length; i++) {
        if (badFood[i].getY > 770  == true) {
            badFood.shift(i);

        }
    }

    for (let i = 0; i < goodFood.length; i++) {
        
        if (goodFood[i].getY > 770 == true) {
            badFood.shift(i);
        }
    }

    
}

function touchBadFood(){
    if (badFood.length > 0){
        for (let i = 0; i < badFood.length; i++) {
            let badFoodX = badFood[i].getX;
            let badFoodY = badFood[i].getY;
            if (dist(badFoodX, badFoodY, controllerX, 620)<40) {
                console.log('Perdiste')
                badFood = [];
                goodFood = [];
                lostGame = true;
            }
        }
    }
    
}

function touchGoodFood(){
    
    if (goodFood.length > 0){
        console.log('funciono')
        for (let i = 0; i < goodFood.length; i++) {
            
            let goodFoodX = goodFood[i].getX;
            let goodFoodY = goodFood[i].getY;
            if (dist(goodFoodX, goodFoodY, controllerX, 620)<30) {
                console.log('toca comida buena');
                goodFood.splice(i,1);
               puntos = puntos + 100;
            }
        }
    }
    
}

function paintPuntos(){
    fill(255);
    text('Puntuación '+puntos, 560, 50);
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
            //image(screen3, 600/2, 766/2);
            imageMode(CORNER);
            image(screen3, 0, 0);
            imageMode(CENTER);
            if (lostGame == false){
                paintPuntos();
                paintDogBowl();
                createFood();
                paintFood();
                touchBadFood();
                touchGoodFood();
                removeFood();
            }
            
            break;

        case 4:
            imageMode(CORNER);
            image(screen4, 0, 0);
            break;

        case 5:
            imageMode(CORNER);
            image(screen5, 0, 0);
        
            break;

        case 6:
            imageMode(CORNER);
            image(screen6, 0, 0);
            break;

        default:
            break;
    }
}

socket.on('mupi-instructions', instructions => { 
    //console.log('ID: ' + socket.id);

    let {
        interactions
    } = instructions; //desestructuración de objetos. Si el objeto tiene varias propiedades es lo mismo a decir let interactions = instructions.interactions
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
    console.log("Screen change")
    let {
        windowWidth,
        windowHeight
    } = deviceSize;
    deviceWidth = windowWidth;
    deviceHeight = windowHeight;
    console.log(`User is using a smartphone size of ${deviceWidth} and ${deviceHeight}`);
    // screenNum++;
});

socket.on('mupi-react-to-change', screen => {
    screenNum++;
    console.log("Screen has been changed");
})