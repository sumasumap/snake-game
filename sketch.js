const PLAY = 1;
const END = 0;

var gameState = PLAY;
var gameover,restart,gameoverimage,restartimage;
var girl,girlimage,ground;
var apple,snake, stone;
var score = 0;

function preload(){
  
  bg =loadImage("forest.jpg");
  girlimage=loadAnimation("g1.png","g2.png","g3.png");

  snake = loadImage("s1.png");
  A = loadImage("a1.png");   //A stands apple
  gameoverimage = loadImage("gameover.png");
  restartimage = loadImage("restart.png");
  stone = loadImage("stone.png");
  girlstop = loadAnimation("g2.png");
  
}
function setup() {
  createCanvas(800, 300);
  
  ground  = createSprite(400,150)
  ground.x = ground.width/2;
  ground.addImage(bg);

  girl = createSprite (200,200,200,250);
  girl.addAnimation("running",girlimage);
  girl.addAnimation("stop",girlstop);
  girl.scale = 0.4;
  girl.x = 70;
  
  gameover = createSprite(350,100);
  gameover.addImage(gameoverimage) ;
  gameover.visible = false; 
  gameover.scale = 0.4;
  
  restart = createSprite(350,200);
  restart.addImage(restartimage);
  restart.visible = false;
  restart.scale = 0.4;
  
  ObstacleGroup = createGroup();
}
function draw() {
  background(220);
  edge= createEdgeSprites();
  
  if(gameState === PLAY){
    score = score+Math.round(getFrameRate()/60);
      edge= createEdgeSprites();
      ground.velocityX = -4;
    
      if(ground.x<0){
       ground.x = ground.width/2;
      }
      
      
    if(keyDown("space") && girl.collide(edge[3])){
      
      girl.velocityY =-20;
     
    
    }
    girl.velocityY = girl.velocityY+1;
    
        
  if(ObstacleGroup.isTouching(girl)){
      gameState = END;
    }
  moveApple();
  spawnobstacles();
    
  }
   else if(gameState === END){
    
    ground.velocityX = 0;
    
    girl.velocityY =0;
    girl.changeAnimation("stop",girlstop);
     
    ObstacleGroup.setVelocityXEach(0);
    apple.velocityX = 0;
    
    ObstacleGroup.setLifetimeEach(-1);
    
    gameover.visible=true;
    restart.visible = true;
    
  }

  if(mousePressedOver(restart)){
    reset();
  }
  girl.collide(edge[3]);

  drawSprites();
  console.log(gameState);
  textSize(25);
  fill("black");
  text("Score: " + score , 130,20);
  
  
}
 
function  moveApple(){
   
   if(frameCount%100==0){
     apple =  createSprite(600,random(20,120));     
     apple.addImage(A);
     apple.velocityX= -3;
     apple.scale = 0.25;
     apple.lifetime = 200;
   }   
}
function spawnobstacles(){
  if(frameCount%100===0){
    obstacles= createSprite(600,260);
  
    obstacles.velocityX=-5;
    obstacles.scale = 0.22;
    
    obstacles.lifetime =130;
    
    rand = Math.round(random(1,2));
   // obstacles.debug= true;
   
    
    
    switch(rand){
      case 1: obstacles.addImage(snake);
      break;
      case 2: obstacles.addImage(stone);
      break;
      default:break;
    }
    
    ObstacleGroup.add(obstacles);
  } 
    }
function reset(){

gameState = PLAY;
  ObstacleGroup.destroyEach();
  apple.destroy();
  score = 0;
  gameover.visible= false;
  restart.visible = false;
  girl.changeAnimation("running",girlimage);
  

}
  