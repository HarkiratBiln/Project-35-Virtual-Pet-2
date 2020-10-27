//Creating the Variables
var dog, happyDog;
var foodS, foodStock, foodObj;
var database;
var feedPetButton, addFoodButton;
var fedTime, lastFed;

function preload()
{
  //Loading the Images
  dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(700, 500);
  database = firebase.database();

  //Creating the Food Object
  foodObj = new Food();

  //Creating the Feed Button
  feedPetButton = createButton("Feed the Dog");
  feedPetButton.position(700,95);
  feedPetButton.mousePressed(addFoods);

  //Creating the Add Food Button
  addFoodButton = createButton("Add Food");
  addFoodButton.position(800,95);
  addFoodButton.mousePressed(addFoods);

  //Creating the Dog Sprite
  dog = createSprite(250,300);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  //Foodstock
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  

  background(46,139,87);

  //Displaying the FoodObj
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data) {
    lastFed = data.val();
  });

  

  fill(255);
  stroke("black");
  text("Food Remaining"+ foodS,100,100);
  textSize(25);
  

  text("Note: Press the UP arrow key to feed Ollie the Dog!",70,200);
  textSize(26);

  if(lastFed >= 12) {
    text("Last Fed: " + lastFed & 12 + "PM",350,30)
  }
  else if(lastFed === 0) {
    text("Last Fed: 12 AM",350,30);
  }
  else {
    text("Last Feed: " + lastFed + "AM",350,30);
  }

  drawSprites();
}

function readStock(data) {

  foodS = data.val();  
}


function writeStock(number) {
  if(number <= 0){
    number =0;
  }
  else{
    number = number-1;
  }

  database.ref("/").update({
    Food:number 
  })
}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() -1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods() {
  foodS++;
  data.ref("/").update({
    Food: foodS
  })
}
