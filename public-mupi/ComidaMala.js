class ComidaMala {
    constructor(x,y,radio,vel) {
        x = x;
        y = y;
        radio = 50;
        vel = 5;
    }

    pos() {
        x = random(10, 590)
        y = -10
    }

    draw() {
        fill(255);
        ellipse(x, y, radio, radio);
        this.move();
    }


    move() {
        y =+vel;
    }


}