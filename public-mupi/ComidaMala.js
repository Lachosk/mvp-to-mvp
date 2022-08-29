class ComidaMala {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.radio = 30;
        this.vel = 10;
    }

    draw() {
        fill(255,0,0);
        ellipseMode(CENTER);
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