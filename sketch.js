
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivaltime=0;
var score=0;
var background1,bgimg;
var gamoverimg,gameover,restarimg,restart;
var gamestate="play";
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgimg=loadImage("jungle background.jpg");
  gameoverimg=loadImage("gameover_mgh-1-removebg-preview.png");
  restartimg=loadImage("red_reset-removebg-preview.png");
}



function setup() {
  createCanvas(600,400);
  obstacleGroup = createGroup();
  FoodGroup = createGroup(); 
  background1=createSprite(300,250,600,350);
  background1.addImage(bgimg);
  background1.scale=2.6;

  monkey=createSprite(80,380,20,20);
  monkey.addAnimation("monkey moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(0,380,1500,10);
  ground.shapeColor="black";
  
  gameover=createSprite(300,200);
  gameover.addImage(gameoverimg);
  gameover.scale=0.3;
  
  restart=createSprite(300,270);
  restart.addImage(restartimg);
  restart.scale=0.2;
  
}


function draw() {
  background("#87CEFA");
  monkey.collide(ground);
  if(gamestate==="play")
  {
    //survivaltime=Math.ceil(frameCount/frameRate())
      ground.velocityX=-3;
      ground.visible=true;
      if(keyDown("space")&&monkey.y>=344)
      {
          monkey.velocityY = -15;
      }
      survivaltime=survivaltime+Math.round(getFrameRate()/60 );
      monkey.velocityY = monkey.velocityY + 0.6;
      gameover.visible=false;
      restart.visible=false;
      spawnfruits();
      obstacles();
      if(monkey.isTouching(FoodGroup))
      {
          FoodGroup.destroyEach();
          score=score+1;
      }
      if(monkey.isTouching(obstacleGroup))
      {
           gamestate="end";
		   monkey.velocityY=0;
      }
   }
   if(gamestate==="end")
   {
       FoodGroup.setVelocityXEach(0);
       obstacleGroup.setVelocityXEach(0);
       obstacleGroup.setLifetimeEach(-1);
       FoodGroup.setLifetimeEach(-1);
       gameover.visible=true;
       restart.visible=true;
    
   }    
  
   if(mousePressedOver(restart)&& gamestate==="end")
   {
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      monkey.x=80;
      gamestate="play";
      survivaltime=0;
      score=0
      gameover.visible=false;
      restart.visible=false;
   }
   if(ground.x<0)
   {
          ground.x=ground.width/2;
   }
   drawSprites();
   stroke("red");
   textSize(20);
   text("score:"+score,300,50);
  
   stroke("red");
   textSize(20);
   text("survivaltime:"+survivaltime,300,100);
}

function spawnfruits(){
   if (frameCount%100 === 0){
    
    banana = createSprite(500,Math.round(random(200,350)), 50, 50 )
    banana.addImage(bananaImage);
    banana.scale = 0.1;          
    banana.lifetime = 200;
    banana.velocityX=-(3+(survivaltime/50));
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(Math.round(random(550,600)),350,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1 ;
    obstacle.velocityX = -(3+(survivaltime/50));
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
   
}


