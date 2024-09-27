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

const monsters = [
  {
    name : "slime",
    level: 2,
    health: 15
  }, 
  {
    name: "fanged beast",
    level: 8,
    health: 60
  }, 
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]

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
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// Creating function for RPG-game
function update(location) {
  //this way, we dont need to assign every value for everytime we changes location using the respective function
  monsterStats.style.display = 'none'; //hide the monster if we're not clicking the fight button
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text; //n order for the &#x2620; emoticon text to properly display on the page, you will need to use the innerHTML property. The innerHTML property allows you to access or modify the content inside an HTML element using JavaScript.
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

function buyHealth() {
  if(gold>=10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = '';
  } else {
    text.innerText = "You do not have enough gold to buy health."
  }
}

function buyWeapon() {
  if(currentWeaponIndex < weapons.length-1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name; //You should tell the player what weapon they bought. In between the two lines you just wrote, use let to initialize a new variable called newWeapon. Set this to equal weapons.
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon); //add the item in to inventory
      text.innerText += " In your inventory you have: " + inventory; //Up until now, any time text.innerText was updated, the old text was erased. This time, use the += operator to add text to the end of text.innerText.
    }
    else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    // if the player already has all the weapon he have the option to sell it
    button2.innerText = "Sell weapon for 15 gold"
    button2.onclick = sellWeapon;
    text.innerText = "You already have the most powerful weapon!";
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0; //this 0 is the slime index in the monsters array
  goFight();
}

function fightBeast() {
  fighting = 1; //this 1 is the beast index in the monsters array
  goFight();
}

function fightDragon() {
  fighting = 2; //this 2 is the dragon index in the monsters array
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health; //adjusting to the index of monster we're fighting
  monsterStats.style.display = 'block'; //access the monsterStats element id in the html code and manipulating the style with inline styling
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsters[fighting].health;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name +".";
  health -= getMonsterAttackValue(monsters[fighting].level);

  //manage to hit or miss
  if(isMonsterHit()) {
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  // The Math object in JavaScript contains static properties and methods for mathematical constants and functions. One of those is Math.random(), which generates a random number from 0 (inclusive) to 1 (exclusive). Another is Math.floor(), which rounds a given number down to the nearest integer. Using these, you can generate a random number within a range. For example, this generates a random number between 1 and 5: Math.floor(Math.random() * 5) + 1;.
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonster();
    if (fighting === 2) { //if we win against the dragon
      winGame();
    } else {
      defeatMonster();
    }
  }

  //chance for your weapon to breaks. (0.1% and only if u have more than 1 weapon)
  if (Math.random() <= .1 && inventory.length!==1) {
    text.innerText += " Your " + inventory.pop() + " breaks."
    //inventory.pop() return the value that's getting popped
    currentWeaponIndex--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp)); //enemies attack will deal 5 times its level minus a random number between 0 and the player's xp
  console.log(hit);
  return hit > 0 ? hit : 0; 
  //return hit // If you play the game in its current state you might notice a bug. If your xp is high enough, the getMonsterAttackValue function will return a negative number, which will actually add to your total health when fighting a monster! You can fix this issue by using a ternary operator to ensure negative values are not returned.
}

function isMonsterHit() {
  //function to make your attack able to miss at 20% chance
  return Math.random() > .2 || health < 20;
  // if your health is < 20, u will not miss
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]); 
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while(numbers.length<10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess +". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if(health <= 0) {
      lose();
    }
  }
}

// initialize buttons functionalities
button1.onclick = goStore; //goStore; assigns the function itself, allowing it to be triggered when the event occurs. goStore(); calls the function immediately and assigns the result (which is typically undefined) to the event handler.
button2.onclick = goCave;
button3.onclick = fightDragon;







