class ComidaMala {
    constructor(x,y,radio,vel) {
        this.x = x;
        this.y = y;
        this.radio = 30;
        this.vel = 10;
    }

    draw() {
        fill(255,0,0);
        ellipse(this.x, this.y, this.radio, this.radio);
        this.move();
    }


    move() {
        this.y =++ this.vel;
    }

    get getX(){
        return this.x;
    }

    get getY(){
        return this.y;
    }


}