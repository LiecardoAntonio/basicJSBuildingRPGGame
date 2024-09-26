let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0; //bcoz the first weapon is stick (check the weapons array variable)
let fighting;
let monsterHealth;
let inventory = ["stick"];

// button1 is a variable that is not going to be reassigned. If you are not going to assign a new value to a variable, it is best practice to use the const keyword to declare it instead of the let keyword. This will tell JavaScript to throw an error if you accidentally reassign it.
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//const locations = []; //In your role playing game, you will be able to visit different locations like the store, the cave, and the town square. You will need to create a data structure that will hold the different locations. Use const to create a variable called locations and assign it an empty array.

//javascript object
const cat = {
  name: "Whiskers",
  "Number of legs": 4,
}
// console.log(cat.name);
// console.log(cat["Number of legs"]);

//array of object 
const weapons = [
  {
    name: "stick",
    power: 5
  }, {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"], //another array 
    "button functions": [goStore, goCave, fightDragon], //containing functions name
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text:  "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  }
];

// Creating function for RPG-game
function update(location) {
  //this way, we dont need to assign every value for everytime we changes location using the respective function
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  // button1.innerText = "Go to store";
  // button2.innerText = "Go to cave";
  // button3.innerText = "Fight dragon";
  // button1.onclick = goStore;
  // button2.onclick = goCave;
  // button3.onclick = fightDragon;
  // text.innerText = "You are in the town square. You see a sign that says \"Store\".";
  // You need to wrap the text Store in double quotes. Because your string is already wrapped in double quotes, you'll need to escape the quotes around Store. You can escape them with a backslash \. Here is an example:
  update(locations[0]);
}

function goStore() {
  // button1.innerText = "Buy 10 health (10 gold)";
  // button2.innerText = "Buy weapon (30 gold)";
  // button3.innerText = "Go to town square";
  // button1.onclick = buyHealth;
  // button2.onclick = buyWeapon;
  // button3.onclick = goTown;
  // text.innerText = "You enter the store.";
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function fightDragon() {
  console.log("Fighting dragon.");
}

function buyHealth() {
  if(gold>=10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health."
  }
}

function buyWeapon() {
  if (gold >= 30) {
    gold -= 30;
    currentWeaponIndex++;
  }
  goldText.innerText = gold;
  let newWeapon = weapons[currentWeaponIndex].name; //You should tell the player what weapon they bought. In between the two lines you just wrote, use let to initialize a new variable called newWeapon. Set this to equal weapons.
  text.innerText = "You now have a " + newWeapon + ".";
  inventory.push(newWeapon); //add the item in to inventory
}

function fightSlime() {

}

function fightBeast() {
  
}

// initialize buttons functionalities
button1.onclick = goStore; //goStore; assigns the function itself, allowing it to be triggered when the event occurs. goStore(); calls the function immediately and assigns the result (which is typically undefined) to the event handler.
button2.onclick = goCave;
button3.onclick = fightDragon;







