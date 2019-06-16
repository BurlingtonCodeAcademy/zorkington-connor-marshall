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
/////TODO/////
//convert items into objects and give them names, descriptions, pickup ability and pickup text
//same for room features
//add hunger status to user

class Room {   //lets us make new room objects with <new>, fill out each section in order separated by commas
  constructor(
    descriptions,
    items,
    puzzles,
    connections,
    thing,
    errorStatement
  ) {
    this.description = descriptions;
    this.roomInventory = items;
    this.puzzles = puzzles;
    this.connections = connections;
    this.things = thing;
    this.error = errorStatement;
  }
}
class Thing { // creates new objects both immovable and ones the player can pick up.
  constructor(name, altNames, description, pickUpText, takeable) {
    this.name = name;
    this.altNames = altNames;
    this.description = description;
    this.pickUpText = pickUpText;
    this.takeable = takeable;
  }
}
let puzzles = { 
  keyCode: function keyCode(code) { //keycode puzzle could use improvement right now "USE 12345" works and nothing else
    if (code === "12345" && mainst.connections != "foyer") {
      mainst.connections.push("foyer");
      console.log(
        " Success! The door opens. You enter the foyer and the door shuts behind you."
      );
      user.actions.move("foyer");
    } else if (mainst.connections == "foyer") {
      console.log("the door is already unlocked");
    } else {
      console.log("BZZZZ wrong code");
    }
  },
};
///things////
let paper = new Thing(
  "News Paper",
  ["news paper", "paper", "tabloid", "old persons iphone"],
  "A basic news paper. its probably fake news",
  "you don't know why but you take the dirty news paper off the ground",
  true
);

let sevenDays = new Thing(
  "Seven Days",
  ["seven days", "paper", "tabloid", "old persons iphone", "news paper"],
  "A copy of Seven Days, Vermont's Alt-Weekly",
  "You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does.",
  true
);
let sign = new Thing(
  "Sign",
  ["sign"],
  `The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.`,
  "That would be selfish. How will other students find their way?",
  false
);

////rooms/////
///TODO rooms should be reworked so more commands work including directions. right now you have to call the name exactly.
let mainst = new Room(
  `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.\n`,
  [paper, sign],
  puzzles.keyCode,
  [],
);
// after entering keyCode, PC enters the foyer
let foyer = new Room(
  `Foyer.
You find yourself in the stairwell- or "foyer" as it is known in some cultures. 
As you think of the word "foyer" you smile to yourself and compliment your refined cultural pallete, "Go, me!" you think. 
Taking a mental inventory of your surroundings, you notice a copy of the 'Seven Days' newspaper folded up in the corner`,
  [sevenDays],
  null,
  ["mainst", "upstairs"],
  ""
);
// assuming PC has grabbed the newspaper, they have the choice to head upstairs


// from the foyer, PC has the option to walk upstairs- this is the path to progression. PC can go back outside, but that'd be silly.
let upstairs = new Room(
  `Upstairs.
You are at the top of the stairwell facing the balcony door, 
the bathroom door to your right, and to your right is the Burlington Code Academy classroom. Through the window of the balcony door, you see somebody puffing their Juul outside.`,
  null,
  null,
  ["bathroom", "classroom", "balcony"]
);
// from here, PC can either walk through balcony door, enter bathroom, or go to classroom. All 3 are different and unique Room.

// going to the bathroom will yield a dead-end at this time. the only available action is to 'go back' to 'upstairs'
let bathroom = new Room(
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
let balcony = new Room(
  `Balcony.
You walk through the door leading to the balcony. 
You are standing outside. Your classmate Connor is puffing on his Juul. 
You notice TA Bob's hat laying on the ground...`,
  ["Bobs hat", "Connor"],
  null,
  ["upstairs"]
);

//
let classroom = new Room(
  `Classroom.
You open the door to the classroom and walk in. 
You are standing in the classroom.
Joshua is presenting a lecture to the class...`,
["chair"],
  null,
  ["upstairs"]
);

//
let mrMikes = new Room(
  `You walk down the street heading east towards VCET.
  You arrive at the entrace to Mr. Mikes Pizza and walk in.
  The thick aroma of gluten and mozzarella fills your nostrils as you walk up to the counter.
  The counterperson welcomes you and awaits your response...`,
  ["counterperson", "pizza"],
  null,
  ["mainst"]
);

////////LOOKUP TABLES//////////////
//these let use search for keywords adding flexibility
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
  activateExternal: ["open", "talk", "speak", "buy", "read"],
  checkIventory: ["inventory", "check inventory", "i"],
  drop: ["drop"],
  use: ["use"],
  help: ["help"]
};

const roomLookup = { //keys on left are strings and values on right are room objects. makes the current room a useable trait
  mainst: mainst,
  foyer: foyer,
  upstairs: upstairs,
  bathroom: bathroom,
  balcony: balcony,
  classroom: classroom,
  mrMikes: mrMikes
};
 ////USER////////
let user = {
  inventory: [],
  currentRoom: "mainst",
  actions: {  //add new actions here in user
    take(input) { 
      //TODO create error if you cant find item. right now it just restarts without saying anything. issue with closer scope in loop.
      roomLookup[user.currentRoom].roomInventory.forEach(obj => { ///takes current rooms inventory and searches each item for keyword and then take-ability
        let found = obj.altNames.find(item => item === input);
        if (found) {
          if (obj.takeable === true) {  //adds the item to the player inventory and then removes it from the room
            user.inventory.push(obj);
            console.log(obj.pickUpText);
            roomLookup[user.currentRoom].roomInventory = roomLookup[
              user.currentRoom
            ].roomInventory.filter(newobj => newobj != obj); //function used multiple times
            return;
          } else {
            console.log(obj.pickUpText);//pick up text prints what happens when you try to pick up an item. values stored in item objects 
            return;
          }
        }
      });
    },
    drop(input) {
      //delete from PC inventory and push to roomInventory.
      //same as take but reversed
      user.inventory.forEach(obj => {
        let found = obj.altNames.find(item => item === input);
        if (found) {
          roomLookup[user.currentRoom].roomInventory.push(obj);
          user.inventory = user.inventory.filter(obj2 => obj2 !== input); //function used multiple times
          console.log(`You droped ${found} in ${user.currentRoom}`);
          return;
        }
      });
    },
    use(input) { //only involved with puzzles. no use for items in inventory yet so fine for now
      roomLookup[user.currentRoom].puzzles(input);
    },
    move(input) {
      // move to new room
      if (input === undefined) { //prompts the user to give a destination
        console.log("move where?");
        return;
      }
      let found = roomLookup[user.currentRoom].connections.find(
        room => room === input
      ); // checks if you can move to desired location. right now names need to be exact. need improvement TODO
      if (input === found) {
        user.currentRoom = found;
        console.log(`You moved to ${user.currentRoom}`);
        return;
      } else {
        console.log("You can't move there");
        return;
      }
    },
    checkIventory() {
      user.inventory.forEach(item => {

        console.log(`You are carrying:\n${item.name}:\n${item.description}\n`); //prints everything in user inventory with descriptions
      });
      return;
    },
    activateExternal(input) {
      console.log(roomLookup[user.currentRoom].things[input]); //looks up description of a thing and prints it best way to tell a story with LOOK
    },
    help(){
      console.log("You can MOVE TAKE DROP USE or LOOK") //TODO prints possible actions needs improvement
    }
  }
};
////main function runs game in loop taking user input
async function action() {
  let input = await ask("\n"+roomLookup[user.currentRoom].description+"\n");
  checkValidInput(input);
  ///////TEST STUFF HERE//////
  return action();
}
action();

function checkValidInput(userInput) {
  input = userInput.toLowerCase(); //convert everything to lower case
  let inputArr = input.split(" "); //separate action from input
  let action = inputArr[0];         //TODO only can use two words and the first word has to be a one word action. needs improvement
  let directive = inputArr[1];
  for (let action2 in acceptbleCommands) {
    // action2 are the true actions found is the user input
    let found = acceptbleCommands[action2].find(action3 => action3 === action); //checks possible names for an action and converts it into something usable
    if (found) {
      user.actions[action2](directive); //calls action with directive as input all the actions use the value from directive
      return;
    }
  }
  console.log(`Sorry, I don't know how to ${action}.`);   //prints if there is no action for input
  return;
}