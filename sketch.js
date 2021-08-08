//Create variables here
var dog, happyDog;
var database; 
var foodS, foodStock;
var dogImg, dogImg1;

function preload(){
//load images here
dogImg = loadImage("Images/dogImg.png");
dogImg1 = loadImage("Images/dogImg1.png");
}

function setup() {
database = firebase.database();
createCanvas(500, 500);
dog = createSprite(250, 300, 150, 150);
dog.addImage(dogImg);
dog.scale = 0.2;

foodStock = database.ref("Food");
foodStock.on("value", readStock);
textSize(20);
}


function draw() {  
background(46, 139, 87);

if(keyDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(dogImg1);
}

  drawSprites();
  //add styles here
  textSize(16);
  fill("white");
  stroke("green");
  text("Note: Press UP_ARROW Key to Feed Drago Milk!", 75, 25);
  textSize(16);
  fill("red");
  stroke("black");
  text("Food Remaining: " + foodS, 150, 50);
}

function readStock(data){
foodS = data.val();
}

function writeStock(x){
if (x <= 0){
x = 0; 
}
else{
//short way of saying x = x - 1
x = x - 1
}
database.ref("/").update({
Food:x
})
}
