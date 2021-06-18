var dog,dogImg,happyDogImg;
var foodObj;
var foodS,foodStock;
var fedTime,lastFed,feed,addFood;
var database;

function preload()
{
dogImg=loadImage("images/dogImg.png")
happydogImg=loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500, 500);
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog=createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale=0.2;
}



function draw() {  
    
  background(46,139,87);

  if(foodS!==undefined){
    textSize(20);
    fill(225);
    text("note:press up arrow to feed milk to Drako",50,50);
    text("food remaining:"+foodS,150,150);
  
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happydogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }



    if(foodS===0){
      foodS=20;
    }


  
  

     drawSprites();
  //add styles here
  }
}

function writeStock(x){
 if(x<=0){
   x=0;
 }
 else{
   x=x-1;
 }
 database.ref("/").update({
   Food:x
 });
}


function readStock(data){
  foodS=data.val();
}