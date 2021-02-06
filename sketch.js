var PLAY=1;
var END=0;
var gameState=PLAY;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
//const Body = Matter.Body;

var ground,backgroundimg;
var player,playerimg;
var score=0;
var obstaclesGroup;
var obstacle,obstacleimg;
var mask,maskimg;
var text1;

function preload()
{
	obstacleimg=loadImage("images/germs.png")
	maskimg=loadImage("images/covid.png")
	playerimg=loadImage("images/robort.png")
	backgroundimg=loadImage("images/hospital.jpg")		
}


function setup() {
	createCanvas(1200, 600);


	engine = Engine.create();
	world = engine.world;

ground=createSprite(600,598,1200,20);
ground.shapeColor="grey";
player=createSprite(100,560,30,60);
player.addImage(playerimg);
player.scale=0.15;
//player.debug=true;
player.setCollider("rectangle",0,0,250,750);
mask=createSprite(400,200,200,200);
//mask.shapeColor="blue";
mask.addImage(maskimg);
text1=createSprite(550,210,100,100);
text1.shapeColor="red";
	//Engine.run(engine);
  obstaclesGroup=createGroup()
}


function draw() {
 // rectMode(CENTER);
  background(backgroundimg);
  textSize(25);
  fill("blue");
  text("Score: "+score,1000,50);
  score=Math.round(frameCount/1);
  //Engine.update(engine);
//ground.display();
 //player.display();

 if(gameState===PLAY){
//console.log(player.y);
 spawnObstacles();
 mask.visible=false;
 text1.visible=false;
 if(keyDown("space") && player.y>=525){
 player.velocityY=-10;
 }
 player.velocityY=player.velocityY+0.5;
 if(obstaclesGroup.isTouching(player)) {
  gameState=END;
 }
player.collide(ground);
 }
if(gameState===END){
	console.log("game ended");
	obstaclesGroup.setVelocityXEach(0);
	player.velocityY=0;
	mask.visible=true;
	text1.visible=true;
	score=0;
	
}
 drawSprites();

}

function spawnObstacles(){
	if(frameCount%130===0){
	var obstacle=createSprite(1200,570,20,20);
	obstacle.addImage(obstacleimg);
	obstacle.scale=0.1;
	obstacle.shapeColor="yellow";
	obstacle.velocityX=-5;
	obstaclesGroup.add(obstacle);
	//obstacle.debug=true;
	obstacle.lifetime=240;
 }
}





