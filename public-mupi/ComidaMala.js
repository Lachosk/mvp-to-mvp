class ComidaMala {
    constructor(x,y,radio,vel) {
        this.x = x;
        this.y = y;
        this.radio = 50;
        this.vel = 5;
    }

    draw() {
        fill(255);
        ellipse(this.x, this.y, this.radio, this.radio);
        this.move();
    }


    move() {
        this.y =++ this.vel;
    }


}