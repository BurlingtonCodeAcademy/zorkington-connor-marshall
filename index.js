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
  constructor(description, items, puzzles, connections) {
    this.description = description;
    this.roomInventory = items;
    this.puzzles = puzzles;
    this.connections = connections;
  }
}

let mainSt = new rooms(
  `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`,
  ["paper"],
  keyCode,
  []
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
  []
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
  []
);
// from here, PC can either walk through balcony door, enter bathroom, or go to classroom. All 3 are different and unique rooms.

let bathroom = new rooms(
  `Bathroom.
You decide to head into the bathroom for reasons unknown to anyone other than yourself. You punch in the code... '0202' and turn the handle.
The door doesn't budge. This room is in use. You hear an affirming grunt on the other side of the door. Best to walk away now.`,
  null,
  null,
  []
);

let balcony = new rooms(
  `Balcony.
You walk through the door leading to the balcony. 
You are standing outside. Your classmate Connor is puffing on his Juul. 
You notice TA Bob's hat laying on the ground.`,
  ["Bobs hat"],
  null,
  []
);

let classroom = new rooms(`Classroom.
You open the door to the classroom and walk in. 
You are standing in the classroom`);

let mrMikes = new rooms(``);

//////////////////////////////////////////
const commands = {
direction: [],

}

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
    take(input, roomInventory) {
      //delete from roomInventory and push to PC inventory
      let found = roomInventory.find(item => item === input);
      console.log(found);
      if (found === undefined) {
        console.log(`there is no ${input}`);
        return;
      }
      user.inventory.push(found);
      roomLookup[user.currentRoom].roomInventory = roomInventory.filter(
        items => items !== input
      );
      return;
    }
  },
  drop(input) {
    //delete from PC inventory and push to roomInventory
  },
  use(input) {
    //use item or object?
  },
  move(input) {}
};
user.actions.take("paper", roomLookup[user.currentRoom].roomInventory);
//console.log(user.inventory);
console.log(mainSt.roomInventory);
console.log(user.inventory);

/////////stuff to go into objects/////

function keyCode(code) {
  if (code === 12345) {
    main.connections.push("stairs");
  }
}

let inventory = ["food", "cat", "key", "meth"];
////// TAKE() action /////
async function action() {
  let input= await ask();
  //check action
  //perform action/
  return action();
}


// function take(input, roomInventory) {
//   let found = roomInventory.find(item => item === input);
//   if (found === undefined) {
//     console.log(`there is no ${input}`);
//     return roomInventory;
//   }
//   inventory.push(found);
//   return roomInventory.filter(items => items !== input);
// }
// console.log(inventory);
// console.log(this.roomInventory);
// roomInventory = take(input, roomInventory);
// console.log(inventory);
// console.log(this.roomInventory);
/////////////////////////////////////////////////////////////
