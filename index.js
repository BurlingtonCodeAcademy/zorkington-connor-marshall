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
//add hunger status to user

class Room {
  //lets us make new room objects with <new>, fill out each section in order separated by commas
  constructor(
    descriptions,
    items,
    puzzles,
    connections,
    thing, //TODO remove
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
class Thing {
  // creates new objects both immovable and ones the player can pick up.
  constructor(name, altNames, description, pickUpText, takeable) {
    this.name = name;
    this.altNames = altNames;
    this.description = description;
    this.pickUpText = pickUpText;
    this.takeable = takeable;
  }
}
let puzzles = {
  keyCode: function keyCode(code) {
    //keycode puzzle could use improvement right now "USE 12345" works and nothing else
    if (code === "12345" && mainst.connections != "foyer") {
      mainst.connections.push("foyer");
      console.log(
        " Success! The door opens. You enter the foyer and the door shuts behind you."
      );
      door.description="the door is now unlocked you can now walk through"
      user.actions.move("foyer");
    } else if (mainst.connections == "foyer") {
      console.log("the door is already unlocked");
    } else {
      console.log("BZZZZ wrong code");
    }
  }
  //next puzzle
};
///things////

let meth = new Thing(
  "meth",
  ["meth", "crystal", "crystal meth"],
  "It's meth!",
  "You take the meth",
  true
);

let sevenDays = new Thing(
  "sevendays",
  ["sevendays", "seven days", "tabloid", "old persons iphone", "news paper"],
  "A copy of Seven Days, Vermont's Alt-Weekly",
  "You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does.",
  true
);

let sign = new Thing(
  "sign",
  ["sign"],
  `The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.`,
  "That would be selfish. How will other students find their way?",
  false
);
let door =new Thing(
  "door",
  ["door"],
  "The door is locked. There is a keypad on the door handle.",
  "you cant take a door that would be ridiculous",
  false
)

let bobsHat = new Thing(
  "bobsHat",
  ["hat", "bobs hat"],
  "TA Bob's legendary hat. Said to have mystical powers.",
  "You pick up Bob's hat.",
  true
);

let connor = new Thing(
  "connor",
  ["Connor mcginnis", "classmate"],
  "Your classmate, Connor.",
  "Connor questions your motives.",
  false
);

let chair = new Thing(
  "chair",
  ["chair"],
  "An seemingly ordinary chair. If left alone however, it will gravitate towards the middle of the room. May possibly be a haunted chair.",
  "Don't be a thief.",
  false
);

let pizza = new Thing(
  "pizza",
  ["slice", "pizza", "slice", "piece of pizza", "pizza"],
  "A slice of pizza. Good for the mind, good for the body.",
  "You take the slice of pizza.",
  true
);
let counterperson = new Thing(
  "counterperson",
  ["counterperson", "person", "dude"],
  "guy",
  false
);

////rooms/////
///TODO rooms should be reworked so more commands work including directions. right now you have to call the name exactly.

//alt names
let mainst = new Room(
  `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.\n`,
  { sign, door },
  puzzles.keyCode,
  ["mrmikes"]
);
// after entering keyCode, PC enters the foyer
let foyer = new Room(
  `Foyer.
You find yourself in the stairwell- or "foyer" as it is known in some cultures. 
As you think of the word "foyer" you smile to yourself and compliment your refined cultural pallete, "Go, me!" you think. 
Taking a mental inventory of your surroundings, you notice a copy of the 'Seven Days' newspaper folded up in the corner`,
  { sevenDays },
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
  {bobsHat, connor},
  null,
  ["upstairs"]
);

//
let classroom = new Room(
  `Classroom.
You open the door to the classroom and walk in. 
You are standing in the classroom.
Joshua is presenting a lecture to the class...`,
  {chair},
  null,
  ["upstairs"]
);


let mrmikes = new Room(
  `You walk down the street heading east towards VCET.
  You arrive at the entrace to Mr. Mikes Pizza and walk in.
  The thick aroma of gluten and mozzarella fills your nostrils as you walk up to the counter.
  The counterperson welcomes you and awaits your response...`,
  {counterperson, pizza},
  null,
  ["mainst"]
);

////////LOOKUP TABLES//////////////
//these let use search for keywords adding flexibility
///TODO make lookup table for room alt names"

const roomNames = {
  'mainst': mainst,
  'foyer': foyer,
  'upstairs': upstairs,
  'bathroom': bathroom,
  'classroom': classroom,
  'mrmikes': mrmikes
}

const altRoomName = {
  mainst: ["street", "front door"],
  foyer: ["vestibule", "entrance", "doorway", "lobby"],
  upstairs: ["hallway", "landing", "top floor"],
  bathroom: [
    "bath room",
    "toilet",
    "porcelain palace",
    "shitter",
    "john",
    "lavatory"
  ],
  balcony: ["roof", "fire escape"],
  classroom: ["class room", "class", "room", "Burlington Code Academy"],
  mrmikes: [
    "pizza shop",
    "mr. mikes",
    "Mr. Mikes",
    "Mikes",
    "pizza joint",
    "pizza store",
    "Mister Mikes",
    "Mr Mike"
  ]
};
const arrIgnor= ["a", "the", "to", "and","at"]

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
  activateExternal: ["open", "talk", "speak", "buy", "read",],
  look:["look", "inspect", "examine"],
  checkIventory: ["inventory", "check inventory", "i"],
  drop: ["drop"],
  use: ["use"],
  help: ["help"]
};

const roomLookup = {
  //keys on left are strings and values on right are room objects. makes "current room" a useable trait
  mainst: mainst,
  foyer: foyer,
  upstairs: upstairs,
  bathroom: bathroom,
  balcony: balcony,
  classroom: classroom,
  mrmikes: mrmikes
};

////USER////////
let user = {
  inventory: { meth },
  currentRoom: "mainst",
  actions: {
    //add new actions here in user
    take(input) {
      let found = undefined; // for "you don't have" error
      //TODO create error if you cant find item. right now it just restarts without saying anything. issue with closer scope in loop.
      Object.values(roomLookup[user.currentRoom].roomInventory).forEach(obj => {
        ///takes current rooms inventory and searches each item for keyword and then take-ability
        found = obj.altNames.find(item => item === input);
        if (found === input) {
          if (obj.takeable === true) {
            //adds the item to the player inventory and then removes it from the room
            user.inventory[obj.name] = obj;
            console.log(obj.pickUpText);
            delete roomLookup[user.currentRoom].roomInventory[obj.name];
            action();
          } else {
            console.log(obj.pickUpText); //pick up text prints what happens when you try to pick up an item. values stored in item objects
            action();
          }
        }
      });
      if (found === undefined) {
        console.log(`you could not take ${input}`);
      }
    },
    drop(input) {
      //delete from PC inventory and push to roomInventory.
      //same as take but reversed
      let found = undefined; // for "you don't have" error
      Object.values(user.inventory).forEach(obj => {
        let found = obj.altNames.find(item => item === input);
        if (found) {
          roomLookup[user.currentRoom].roomInventory[obj.name] = obj;
          delete user.inventory[obj.name]; //function used multiple times
          console.log(`You dropped ${found} in ${user.currentRoom}`);
          action();
        }
      });
      if (found === undefined) {
        console.log(`You don't have ${input}`);
        action();
      }
    },
    use(input) {
      //TODO if statement to check if puzzle is attached to item or room
      //only involved with puzzles. no use for items in inventory yet so fine for now
      roomLookup[user.currentRoom].puzzles(input);
    },
    move(input) {
      // move to new room
      if (input === undefined) {
        //prompts the user to give a destination
        console.log("Move where?");
        return;
      }
      let found = roomLookup[user.currentRoom].connections.find(
        room => room === input
      ); // checks if you can move to desired location. right now names need to be exact. need improvement TODO
      if (input === found) {
        user.currentRoom = found; ////TODO change to work with alt names
        console.log(`You moved to ${user.currentRoom}`);
        return;
      } else {
        console.log("You can't move there.");
        return;
      }
    },
    look(input) {
      // observe or inspect room or item in room inventory
      console.log(input+"!!!")
      if (input===""){
        console.log("You scan the room and see a... ");
        Object.values(roomLookup[user.currentRoom].roomInventory).forEach(obj => {
        console.log(obj.name+":");
        console.log(obj.description);
        }
        )};
      let found = undefined;
      Object.values(roomLookup[user.currentRoom].roomInventory).forEach(obj => {
        found = obj.altNames.find(item => item === input);
        if (found) {
          roomLookup[user.currentRoom].roomInventory[obj.name] = obj;
          console.log(obj.description)
          action();
        }
       }); 
        if (found === undefined)  {
          console.log ("You don't see that here."); 
      }
    },
      //console.log(Object.values(roomLookup[user.currentRoom].roomInventory));
    
    checkIventory() {
      //TODO if inventory is empty print "you are carrying nothing"
      if (user.inventory==={}){
        console.log("You aren't carrying anything")
        action();
      }
      Object.values(user.inventory).forEach(item => {
        console.log(`You are carrying:\n${item.name}:\n${item.description}\n`); //prints everything in user inventory with descriptions
      });
    },
    activateExternal(input) {
      console.log(
        roomLookup[user.currentRoom].roomInventory[input].description
      ); //looks up description of a thing and prints it best way to tell a story with LOOK
    },
    help() {
      console.log("You can MOVE, TAKE, DROP, USE, or LOOK"); //TODO prints possible actions needs improvement
    }
  }
};
////main function runs game in loop taking user input
async function action() {
  let input = await ask("\n" + roomLookup[user.currentRoom].description + "\n");
  checkValidInput(input);
  ///////TEST STUFF HERE//////
  return action();
}
action();

function checkValidInput(userInput) {
  input = userInput.toLowerCase(); //convert everything to lower case
  let inputArr = input.split(" "); //separate action from input
  inputArr=inputArr.filter(word=>{ /// removes useless words 
    if ( ! arrIgnor.includes(word)){
      return word;
    }
  })
  let action = inputArr[0]; //TODO only can use two words and the first word has to be a one word action. needs improvement
  inputArr.shift(); //TODO only can use two words and the first word has to be a one word action. needs improvement
  let directive = inputArr.join(" ")
  for (let action2 in acceptbleCommands) {
    // action2 are the true actions found is the user input
    let found = acceptbleCommands[action2].find(action3 => action3 === action); //checks possible names for an action and converts it into something usable
    if (found) {
      user.actions[action2](directive); //calls action with directive as input all the actions use the value from directive
      return;
    }
  }
  console.log(`Sorry, I don't know how to ${action}.`); //prints if there is no action for input
  return;
}
