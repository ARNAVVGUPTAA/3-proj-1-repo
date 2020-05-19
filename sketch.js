const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;//pi's are pigs and p's are platforms
var box1, pi,pi1,pi2,pi3,pi4,p1,p2,p3;  
var backgroundImg,platform;
var bird, slingshot;
var state;
var gameState = "onSling";
var bg,backgroundImg;
var score = 0;

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour >= 06 && hour <= 19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}

function preload() {
    getBackgroundImg();
   // bg = "sprites/bg1.png";
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);
    p1 = new Ground(500,100,100,20);
    p2 = new Ground(600,200,100,20);

    pi = new Pig(810, 350);
    pi1 = new Pig1(500,40);
    pi2 = new Pig2(810, 260);
    pi3 = new Pig3(600, 150);
    pi4 = new Pig4(1000,150);


    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    
    p3 = new Ground(1000,200,100,20);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);

    bird = new Bird(200,50);

    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
        Engine.update(engine);

        box1.display();
        box2.display();
        ground.display();
        p1.display();
        p2.display();
        p3.display();
        pi.display();
        pi.score();
        pi3.display();
        pi3.score();
        pi4.display();
        pi4.score();
        pi1.display();
        pi1.score();
        log1.display();

        box3.display();
        box4.display();
        pi2.display();
        pi2.score();
        log3.display();

        box5.display();

        bird.display();
        platform.display();
        slingshot.display();    

        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50);

        if(score === "1000"){
            textSize(50);
            text("YOU'VE WON, KEEP IT UP!!!",100,300);
        }
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       bird.trajectory = []; 
       gameState = "onSling";
       Matter.Body.setPosition(bird.body, {x: 200,y: 50});
       Matter.Body.setAngle(bird.body,0);
       Matter.Body.setAngularVelocity(bird.body,0);
       slingshot.attach(bird.body);
    }
}

