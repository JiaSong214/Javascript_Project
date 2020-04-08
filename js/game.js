let dino;
let cactuses = [];

let backgroundImage;
let game_startImage;
let game_overImage;
let dinoImage = [];
let cactusImage;

let game_start = false;

let backgroundX1 = 0;
let backgroundX2;

function preload(){
    backgroundImage = loadImage("img/background.png");
    game_startImage = loadImage("img/game_start.png");
    game_overImage = loadImage("img/game_over.png");
    // backgroundCloud = loadImage("img/backgroundCloud.png");
    for(i=0; i<2; i++){
        dinoImage[i] = loadImage("img/dino"+[i]+".png");
    }
    cactusImage = loadImage("img/cactus0.png");
}

function setup(){
    const game_canvas = createCanvas(800, 350);
    game_canvas.parent("game_canvas_frame");

    dino = new Dino();
    backgroundX2 = width;
}


function keyPressed(){
    if(key == " "){
        game_start = true;
        draw();
        if(key == " "){
            dino.jump();
        }
    }
}

function draw(){
    if(game_start == false){
        image(backgroundImage, backgroundX1, 0, width, height);
        image(game_startImage, 200, 100, 400, 113);
    }else if(game_start == true){
        if(random(1)<0.007){
            cactuses.push(new Cactus());
        }
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
    
        for(let c of cactuses){
            c.show();
            c.move();
            if(dino.hits(c)){
                image(game_overImage, 250, 150, 300, 20);
                noLoop();
                game_start = false;
            }
        }
        dino.show();
        dino.move();
    }
}

class Dino {
    constructor(){
        this.y = height-50;
        this.vy = 0;
        this.gravity = 2;
    }

    jump(){
        if(this.y >= height-180){
            this.vy = -20;
        }
    }

    hits(cactus){
        return collideRectRect(50+10,this.y,10,10 ,cactus.x, cactus.y,30,60)
    }

    move(){
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y , 0, height-50);
    }

    show(){
        var num = Math.round(Math.random()*1)
        image(dinoImage[num], 50, this.y-40, 50, 50);
    }
}

class Cactus {
    constructor(){
        this.x = width;
        this.y = height-100;
    }
    move(){
        this.x -= 7;
    }
    show(){
        image(cactusImage, this.x, this.y, 30, 60);
    }
}
