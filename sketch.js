const Constraint = Matter.Constraint;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;

var world,engine;
var person,personImg;
var backgroundImg,groundImg,ground;
var background1,background2;
var dogImg1,dogImg2;
var stone;
var stoneBody;
var constraint;
var ground;
var options;
var stoneImg;
var string;
var food;
var foodImg;

function preload(){
  personImg = loadImage("person1.png","person2.png","person3.png","person4.png","person5.png","person6.png","person7.png","person8.png");

  backgroundImg = loadImage("background1.jpg");

  groundImg = loadImage("street.jpg");

  dogImg1 = loadImage("dog.png");

  dogImg2 = loadImage("dog1.png");

  stoneImg = loadImage("stone.png");

  foodImg = loadImage("food.png");
}

function setup() {
  createCanvas(windowWidth-20,windowHeight-20);

  engine = Engine.create();
  world = engine.world;

 // ground = Bodies.rectangle(width/2,500,width,30);
  //World.add(world,ground);

  background1 = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  background1.addImage(backgroundImg);
  background1.velocityX = -6;
  background1.scale= 2.2;
  
  background2 = createSprite(windowWidth*3/2,windowHeight/2,windowWidth,windowHeight);
  background2.addImage(backgroundImg);
  background2.velocityX = -6;
  background2.scale = 2.2;

  person = createSprite(200,windowHeight/2+149,40,100);
  person.addImage(personImg);
  person.scale = 1;

  //stone = createSprite(200,1000,20,20);
  //stone.shapeColor = "black";

  var stoneOptions = {
    'restitution':0.8,
    'friction':1.0,
    'density':1.0
  }
  
  stoneBody = Bodies.rectangle(65,550,20,20,stoneOptions);
  World.add(world,stoneBody);

  var foodOptions = {
    'restitution':0.8,
    'friction':1.0,
    'density':1.0
  }
  
  food = Bodies.rectangle(175,550,20,20,foodOptions);
  World.add(world,food);

  var groundOptions ={
    isStatic:true
  }
  ground = Bodies.rectangle(windowWidth/2,windowHeight-20,windowWidth,20,groundOptions);
  World.add(world,ground);
}

function draw() {
  Engine.update(engine);
  background(255);  

  //image(groundImg,ground.position.x,ground.position.y,width,30);

  if (background1.x <-windowWidth/2){
    background1.x = windowWidth/2;
    background2.x = windowWidth*3/2;
  }

  //mouse.position.x = mouseX;
  //mouse.position.y = mouseY;

  drawSprites();

  push();
  imageMode(CENTER);
  image(stoneImg,stoneBody.position.x,stoneBody.position.y,50,50);
  pop();

  push();
  imageMode(CENTER);
  image(foodImg,food.position.x,food.position.y,50,25);
  pop();

  if(constraint!==undefined && constraint.bodyA!==null){
    strokeWeight(4);
    line(constraint.bodyA.position.x,constraint.bodyA.position.y,constraint.pointB.x,constraint.pointB.y);
  }else{
    stroke("black");
    strokeWeight(4);
    textSize(18);
    text("Press S to attach the stone and F to attach food",390,50);
  }

  spawnAnimals();

  //console.log(frameCount);

  //console.log(mouseY);
}

function mouseDragged(){
  Matter.Body.setPosition(constraint.bodyA,{x:mouseX,y:mouseY});
}

function mouseReleased(){
  if(constraint!==undefined){
    constraint.bodyA = null;
  }
}

function  keyPressed(){
  if(keyCode === 83){
    if(constraint===undefined){
      options = {
        bodyA:stoneBody,
        pointB:{x:150,y:350},
        length:20,
        stiffness:0.2
      }
      constraint = Constraint.create(options);
      World.add(world,constraint);
    }else{
      constraint.bodyA = stoneBody;
    }
    Matter.Body.setPosition(food,{x:175,y:550});
    Matter.Body.setVelocity(food,{x:0,y:0});
  }

  if(keyCode === 70){
    if(constraint===undefined){
      options = {
        bodyA:food,
        pointB:{x:150,y:350},
        length:20,
        stiffness:0.2
      }
      constraint = Constraint.create(options);
      World.add(world,constraint);
    }else{
      constraint.bodyA = food;
    }
    Matter.Body.setPosition(stoneBody,{x:65,y:550});
    Matter.Body.setVelocity(stoneBody,{x:0,y:0});
  }
}

function spawnAnimals(){
  if(frameCount%200===0){
    var animals = createSprite(windowWidth,windowHeight/2+130,20,20);
    animals.velocityX = -2;
    animals.scale = 0.3;
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1:animals.addImage(dogImg1);
      break;
      case 2: animals.addImage(dogImg2);
      break;
      default:break;
    }
  }

}