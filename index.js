const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

class rooms {
  constructor(description, items, puzzles, connections, errorStatement) {
    this.description = description;
    this.roomInventory = items;
    this.puzzles = puzzles;
    this.connections = connections;
    this.error=errorStatement;
  }
}

let mainSt = new rooms(
  `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`,
  ["paper"],
  keyCode,
  ["foyer"],
  "The sign is bolted and you're too weak to remove it."
);

//console.log(mainSt);

// after entering keyCode, PC enters the foyer
let foyer = new rooms(
  `Foyer.
You find yourself in the stairwell- or "foyer" as it is known in some cultures. 
As you think of the word "foyer" you smile to yourself and compliment your refined cultural pallete, "Go, me!" you think. 
Taking a mental inventory of your surroundings, you notice a copy of the 'Seven Days' newspaper folded up in the corner`,
  ["Seven Days"],
  null,
  ["mainSt", "upstairs"],
  ""
);
// assuming PC has grabbed the newspaper, they have the choice to head upstairs

//console.log(foyer);

// from the foyer, PC has the option to walk upstairs- this is the path to progression. PC can go back outside, but that'd be silly.
let upstairs = new rooms(
  `Upstairs.
You are at the top of the stairwell facing the balcony door, 
the bathroom door to your right, and to your right is the Burlington Code Academy classroom. Through the window of the balcony door, you see somebody puffing their Juul outside.`,
  null,
  null,
  ["bathroom", "classroom", "balcony"]
);
// from here, PC can either walk through balcony door, enter bathroom, or go to classroom. All 3 are different and unique rooms.

// going to the bathroom will yield a dead-end at this time. the only available action is to 'go back' to 'upstairs'
let bathroom = new rooms(
  `Bathroom.
You decide to head into the bathroom for reasons unknown to anyone other than yourself. 
You punch in the code... '0202' and turn the handle.
The door doesn't budge. This room is in use. 
You hear an affirming grunt on the other side of the door. 
Best to walk away now...`,
  null,
  null,
  ["upstairs"]
);

//
let balcony = new rooms(
  `Balcony.
You walk through the door leading to the balcony. 
You are standing outside. Your classmate Connor is puffing on his Juul. 
You notice TA Bob's hat laying on the ground...`,
  ["Bobs hat", "Connor"],
  null,
  ["upstairs"]
);

//
let classroom = new rooms(
  `Classroom.
You open the door to the classroom and walk in. 
You are standing in the classroom.
Joshua is presenting a lecture to the class...`["chair"],
  null,
  ["upstairs"]
);

//
let mrMikes = new rooms(
  `You walk down the street heading east towards VCET.
  You arrive at the entrace to Mr. Mikes Pizza and walk in.
  The thick aroma of gluten and mozzarella fills your nostrils as you walk up to the counter.
  The counterperson welcomes you and awaits your response...`,
  ["counterperson", "pizza"],
  null,
  ["mainSt"]
);

//////////////////////////////////////////
const acceptbleCommands = {
  move: ["go", "move", "walk", "head", "proceed", "continue"],
  take: ["take", "pick up", "grab"],
  directions: [
    "forward",
    "backward",
    "straight",
    "back",
    "left",
    "right",
    "north",
    "south",
    "east",
    "west",
    "straight",
    "onward"
  ],
  activateExternal: ["open", "talk", "speak", "buy"],
  checkIventory: ["inventory", "check inventory", "i"]
};

const roomLookup = {
  mainSt: mainSt,
  foyer: foyer,
  upstairs: upstairs,
  bathroom: bathroom,
  balcony: balcony,
  classroom: classroom,
  mrMikes: mrMikes
};



let user = {
  inventory: ["meth"],
  currentRoom: "mainSt",
  actions: {
    take(input, roomInventory) {
      //delete from roomInventory and push to PC inventory
      let found = roomInventory.find(item => item === input);
      console.log(found);
      if (found === undefined) {
        console.log(`There isnt a  ${input} I can take`);
        return;
      }
      user.inventory.push(found);
      roomLookup[user.currentRoom].roomInventory = roomInventory.filter(
        items => items !== input
      ); //function used multiple times
      return;
    },
    drop(input) {
      //delete from PC inventory and push to roomInventory.
      let found = user.inventory.find(item => item === input);
      if (found === undefined) {
        console.log(`You don't have a ${input}`);
        return;
      }
      roomLookup[user.currentRoom].roomInventory.push(found);
      user.inventory = user.inventory.filter(items => items !== input); //function used multiple times
      return;
    },
    use(input) {
      //use item or object?
    },
    move(input) {
      // move to new room
      let found = roomLookup[user.currentRoom].connections.find(
        room => room === input
      );
      if (input === found) {
        user.currentRoom = found;
        return;
      }
      console.log("You can't move there");
      return;
    },
    checkIventory() {
      console.log(user.inventory);
      return;
    }
  }
};

async function action() {
  console.log("start game");
  let input = await ask("test");
  console.log(input);
  //check action
  //perform action/
  let inputArr=input.split(' ');
  //seperate action from input
  let action=inputArr[0];
  let directive=inputArr[1];

  Object.keys(acceptbleCommands).forEach(function(key){
    if (key.find(action=> action === input)){

    }
  };

  // for each key in aceptableComands check each value
  // in the array to see if it matches the first part of the input

  ///////TEST STUFF HERE//////

  console.log(user.currentRoom);
  user.actions.move("Bathroom");
  console.log(user.currentRoom);

  console.log(roomLookup[user.currentRoom].roomInventory);
  console.log(user.inventory);

  user.actions.take("Seven Days", roomLookup[user.currentRoom].roomInventory);

  console.log(roomLookup[user.currentRoom].roomInventory);
  console.log(user.inventory);
  user.actions.drop("meth");

  console.log(user.currentRoom);
  console.log(roomLookup[user.currentRoom].roomInventory);
  console.log(user.inventory);
  console.log(mainSt.roomInventory);

  return action();
};
action();

/////////stuff to go into objects/////

function keyCode(code) {
  if (code === 12345) {
    main.connections.push("stairs");
  }
}
