let dino;
let cactuses = [];
let cactuses02 = [];

let backgroundImage;
// let backgroundCloud;
let dinoImage = [];
let cactusImage;
let cactusImage02;

let backgroundX1 = 0;
let backgroundX2;

function preload(){
    backgroundImage = loadImage("img/background.png");
    // backgroundCloud = loadImage("img/backgroundCloud.png");
    for(i=0; i<2; i++){
        dinoImage[i] = loadImage("img/dino"+[i]+".png");
    }
    cactusImage = loadImage("img/cactus0.png");
    cactusImage02 = loadImage("img/cactus1.png");
}

function setup(){
    const game_canvas = createCanvas(800, 350);
    game_canvas.parent("game_canvas_frame");

    dino = new Dino();
    backgroundX2 = width;
}

function keyPressed(){
    if(key == " "){
        dino.jump();
    }
}

function draw(){
    if(random(1)<0.005){
        cactuses.push(new Cactus());
    }
    if(random(1)<0.005){
        cactuses02.push(new Cactus02());
    }
    // background(backgroundImage);
    
	image(backgroundImage, backgroundX1, 0, width, height);
    image(backgroundImage, backgroundX2, 0, width, height);
    
    let backgroundSpeed = 7;

    backgroundX1 -= backgroundSpeed;
    backgroundX2 -= backgroundSpeed;

    if (backgroundX1 < -width){
        backgroundX1 = width;
    }
    if (backgroundX2 < -width){
        backgroundX2 = width;
    }

    for( let c of cactuses){
        c.show();
        c.move();
        if(dino.hits(c)){
            console.log("game over");
            // noLoop();
        }
    }
    for( let c02 of cactuses02){
        c02.show();
        c02.move();
        if(dino.hits(c02)){
        }
    }
    dino.show();
    dino.move();
}

class Dino {
    constructor(){
        this.r = 50;
        this.x = this.r;
        this.y = height - this.r;
        this.vy = 0;
        this.gravity = 2;
    }

    jump(){
        if(this.y == height-this.r){
            this.vy = -20;
        }
    }

    hits(cactus){
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = cactus .x + cactus .r * 0.5;
        let y2 = cactus .y + cactus .r * 0.5;
        return collideCircleCircle(x1, y1, this.r, x2, y2, cactus.r);
    }

    move(){
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y , 0, height-this.r);
    }

    show(){
        var num = Math.round(Math.random()*1)
        image(dinoImage[num], this.x, this.y-50, this.r, this.r);
    }
}

class Cactus {
    constructor(){
        this.r = 50;
        this.x = width;
        this.y = height-this.r;
    }
    move(){
        this.x -= 7;
    }
    show(){
        image(cactusImage, this.x, this.y-50, this.r, this.r);
    }
}

class Cactus02 {
    constructor(){
        this.r = 40;
        this.x = width;
        this.y = height-this.r;
    }
    move(){
        this.x -= 7;
    }
    show(){
        // var num = Math.round(Math.random()*1);
        image(cactusImage02, this.x, this.y-50, this.r, this.r);
    }
}