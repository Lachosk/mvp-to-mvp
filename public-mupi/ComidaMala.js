class ComidaMala {
    constructor(x,y, imageFood) {
        this.x = x;
        this.y = y;
        this.radio = 30;
        this.vel = 10;
        this.imageFood = imageFood;
    }

    draw() {
        /*fill(255,0,0);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.radio, this.radio);*/
        imageMode(CENTER);
        image(this.imageFood, this.x, this.y, 60, 60);
        //this.move();
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