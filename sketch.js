
var biker, bikerimage;
var ground,groundimage;
var obstacle, obstacleimage;
var backgrounds,backgroundimage;
var invisibleground;
var obstacle, obstacleG, rocksimage1,rocksimage2,obstacleimage1,obstacleimage2;
var trees, treesimage, treesG;
var clouds, cloudsimage, cloudsG;
var gameState="start";
var play,playimage;
var score = 0;


function preload(){

    bikerimage=loadImage("Biker1.png")
    backgroundimage=loadImage("Ground1.png")
    rocksimage1 = loadImage("Rock.png")
    rocksimage2 = loadImage("rock2.png")
    obstacleimage1 = loadImage("obstacle1.png")
    obstacleimage2 = loadImage("obstacle2.png")
    treesimage=loadImage("trees.png")
    cloudsimage=loadImage("Cloud.png")
    playimage=loadImage("play.png")
}


function setup(){

    createCanvas(1000,600)

    clouds = createSprite(1100,Math.round(random(0,150)),10,10)
    trees = createSprite(1100,310,10,10)
    obstacle = createSprite(1100,500,10,10)

    backgrounds = createSprite(0,559,1200,500)
    backgrounds.addImage("background",backgroundimage)
    backgrounds.velocityX=-10;
    backgrounds.scale=1.6;



    obstacleG = new Group()
    treesG = new Group()
    cloudsG = new Group()

    biker= createSprite(200,465);
    biker.addImage(bikerimage)
    biker.scale=0.35;
    //biker.debug=true;

    biker.setCollider("rectangle",0,0,500,400)

    invisibleground=createSprite(200,540,300,10)
    invisibleground.visible=false;
    
    play=createSprite(500,300,10,10)
    play.addImage("play",playimage)
    play.visible=false;
    play.scale=0.05
     
     }


function draw(){


    background("lightblue")

    if(backgrounds.x<backgrounds.width/2-100){
        backgrounds.x=backgrounds.width/2;
    }

    biker.collide(invisibleground)

    biker.velocityY = biker.velocityY+1

    drawSprites();

    if(gameState==="start"){
        textSize(75)
        text("PRESS   PLAY   TO  START",10,100)
        play.visible=true;
        if(mousePressedOver(play)){
            gameState="play";
             score=0;
        }
        
    }

    if(gameState==="play"){

        play.visible=false;
        if(backgrounds.veocityX < 20)
        backgrounds.velocityX= -(10+score/5)
        
        textSize(30)
        text("SCORE : "+score,350,50)
        if(frameCount %50 === 0){
        score = score + 1;}
        console.log(biker.y)

        if(keyDown("UP_ARROW") && biker.y >450){
            biker.velocityY=-25;
        }
        
        
        trees.depth = clouds.depth+1
        obstacle.depth=trees.depth+1;
        biker.depth=trees.depth+1;

        if(biker.isTouching(obstacleG)){
            gameState = "end"
        }
       

        spawnObstacle();
        spawnTrees();
    }

    if(gameState==="end"){
       
        play.visible=true;
        if(mousePressedOver(play)){
            gameState="start";
        }
        textSize(30)
        text("SCORE : "+score,450,200)
        treesG.destroyEach()
        cloudsG.destroyEach()
        obstacleG.destroyEach();

    }
    
}


function spawnObstacle(){
    if(frameCount %100 === 0){
        obstacle = createSprite(1000,500,10,10)
        if(obstacle.velocityX < 20)
        obstacle.velocityX = -(10+score/5)
        obstacleG.add(obstacle)
        var randnum= Math.round(random(1,4))

        switch(randnum){
            case 1:
                obstacle.addImage("rock", rocksimage1);
                obstacle.scale=0.06;
                obstacle.y=515;
                break;
            case 2:
                obstacle.addImage("rock", rocksimage2);
                obstacle.scale=0.06;
                obstacle.y=505;
                break;
            case 3:
                obstacle.addImage("obstacle", obstacleimage1);
                obstacle.scale=0.3;
                break;
            case 4:
                obstacle.addImage("obstacle2",obstacleimage2);
                obstacle.scale=1;
                break;

        }
    }
}


function spawnTrees(){
    if(frameCount %150 === 0){
        trees = createSprite(1000,310,10,10)
        if(trees.velocityX < 20)
        trees.velocityX = -(10+score/5)
        trees.addImage("tress", treesimage)
        trees.scale=0.7;
        treesG.add(trees)
   

    }
    if(frameCount %50 === 0){
      clouds = createSprite(1000,Math.round(random(0,150)),10,10)
      if(clouds.velocityX < 20)
    clouds.velocityX = -(10+score/5)
    clouds.addImage("cloud",cloudsimage)
    clouds.scale=0.4;
    cloudsG.add(clouds)
    }
 
}