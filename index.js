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

class Room {
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
class Thing {
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
    console.log(code + "25");
    if (code === "12345" && mainSt.connections != "foyer") {
      mainSt.connections.push("foyer");
      console.log("the door unlocked");
    } else if (mainSt.connections == "foyer") {
      console.log("the door is already unlocked");
    } else {
      console.log("BZZZZ wrong code");
    }
  },
  testPuzzle: function() {}
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
let mainSt = new Room(
  `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.\n`,
  [paper, sign],
  puzzles.keyCode,
  [],
  {
    sign:
      "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.",
    door: "The door is locked. There is a keypad on the door handle."
  }
);
// after entering keyCode, PC enters the foyer
let foyer = new Room(
  `Foyer.
You find yourself in the stairwell- or "foyer" as it is known in some cultures. 
As you think of the word "foyer" you smile to yourself and compliment your refined cultural pallete, "Go, me!" you think. 
Taking a mental inventory of your surroundings, you notice a copy of the 'Seven Days' newspaper folded up in the corner`,
  sevenDays,
  null,
  ["mainSt", "upstairs"],
  ""
);
// assuming PC has grabbed the newspaper, they have the choice to head upstairs

//console.log(foyer);

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
Joshua is presenting a lecture to the class...`["chair"],
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
  activateExternal: ["open", "talk", "speak", "buy", "read"],
  checkIventory: ["inventory", "check inventory", "i"],
  drop: ["drop"],
  use: ["use"]
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
  inventory: [],
  currentRoom: "mainSt",
  actions: {
    take(input) {
      //delete from roomInventory and push to PC inventory
      roomLookup[user.currentRoom].roomInventory.forEach(obj => {
        let found = obj.altNames.find(item => item === input)
        if (found) {
          if (obj.takeable ===true){
          user.inventory.push(obj);
          console.log(obj.pickUpText);
          roomLookup[user.currentRoom].roomInventory = roomLookup[
            user.currentRoom
          ].roomInventory.filter(newobj => newobj != obj); //function used multiple times
          return;
        }else{
          console.log(obj.pickUpText)
          return
        }
        }
      });
    },
    drop(input) {
      //delete from PC inventory and push to roomInventory.
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
    use(input) {
      roomLookup[user.currentRoom].puzzles(input);
      //use item or object?
    },
    move(input) {
      // move to new room
      if (input === undefined) {
        console.log("move where?");
        return;
      }
      let found = roomLookup[user.currentRoom].connections.find(
        room => room === input
      );
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
      console.log(user.inventory);
      return;
    },
    activateExternal(input) {
      console.log(roomLookup[user.currentRoom].things.sign);
    }
  }
};

async function action() {
  let input = await ask(roomLookup[user.currentRoom].description);
  checkValidInput(input);
  ///////TEST STUFF HERE//////
  return action();
}
action();

function checkValidInput(userInput) {
  input = userInput.toLowerCase();
  let inputArr = input.split(" "); //separate action from input
  let action = inputArr[0];
  let directive = inputArr[1];
  for (let action2 in acceptbleCommands) {
    // action2 are the true actions found is the user input
    let found = acceptbleCommands[action2].find(action3 => action3 === action);
    if (found) {
      user.actions[action2](directive);
      return;
    }
  }
  console.log(`Sorry, I don't know how to ${action}.`);
  return;
}
/////////stuff to go into objects/////
