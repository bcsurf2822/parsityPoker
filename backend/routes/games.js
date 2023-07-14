
const router = require("express").Router();

const Game = require("../models/gamesSchema");


const additionalTableNames = [
  // Bird names
  "Cardinal", "Cuckoo", "Falcon", "Heron", "Jay", "Kestrel", "Lark", "Magpie", "Nightingale", "Oriole",
  "Plover", "Quail", "Raven", "Starling", "Toucan", "Vulture", "Waxwing", "Xenops", "Yellowthroat",
  "Zebrafinch", "Bluejay", "Chaffinch", "Goldfinch", "Ibis", "Junco",

  // Insect names
  "Weevil", "Earwig", "Flea", "Gnat", "Hornet", "Ichneumon", "Junebug", "Katydid", "Lanternfly", "Mayfly",
  "Nematode", "Orchid Mantis", "Planthopper", "Queen Bee", "Roach", "Silverfish", "Thrip", "Uloboridae",
  "Vinegaroon", "Webspinner", "Xylocopa", "Yellowjacket", "Zoraptera", "Atlas Moth", "Bombus"
];

const tableNames = [
  "Eagle",
  "Sparrow",
  "Hawk",
  "Ant",
  "Bee",
  "Butterfly",
  "Robin",
  "Finch",
  "Swallow",
  "Pigeon",
  "Parrot",
  "Owl",
  "Flamingo",
  "Pelican",
  "Woodpecker",
  "Crow",
  "Dove",
  "Hummingbird",
  "Penguin",
  "Seagull",
  "Peacock",
  "Beetle",
  "Moth",
  "Dragonfly",
  "Grasshopper",
  "Termite",
  "Ladybug",
  "Wasp",
  "Firefly",
  "Cicada",
  "Cricket",
  "Mantis",
  "Silverfish",
  "Tick",
  "Aphid",
  "Louse",
  ...additionalTableNames
];

let usedTableNames = new Set();

function generateTableName() {
  if(usedTableNames.size === tableNames.length){
    throw new Error('All names have been used.');
  }

  let randomName = tableNames[Math.floor(Math.random() * tableNames.length)];

  // Ensure the generated name has not been used
  while (usedTableNames.has(randomName)) {
    randomName = tableNames[Math.floor(Math.random() * tableNames.length)];
  }

  // Add the chosen name to the set of used names
  usedTableNames.add(randomName);

  return randomName;
}

usedTableNames.clear();

router.post("/games/initialize", async (req, res) => {
  try {
    usedTableNames.clear();

    const games = [
      {
        name: generateTableName(),
        game: "Hold Em",
        blinds: ".05/.10",
        players: 0,
        min: 5,
        max: 10,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Hold Em",
        blinds: ".1/.2",
        players: 0,
        min: 10,
        max: 20,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Hold Em",
        blinds: ".25/.5",
        players: 0,
        min: 25,
        max: 50,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Hold Em",
        blinds: "1/2",
        players: 0,
        min: 100,
        max: 200,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Hold Em",
        blinds: "2.5/5",
        players: 0,
        min: 250,
        max: 500,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Hold Em",
        blinds: "5/10",
        players: 0,
        min: 500,
        max: 1000,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Hold Em",
        blinds: "10/20",
        players: 0,
        min: 1000,
        max: 2000,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Hold Em",
        blinds: "25/50",
        players: 0,
        min: 2500,
        max: 5000,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi",
        blinds: ".05/.10",
        players: 0,
        min: 5,
        max: 10,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi",
        blinds: ".1/.2",
        players: 0,
        min: 10,
        max: 20,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi",
        blinds: ".25/.5",
        players: 0,
        min: 25,
        max: 50,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi",
        blinds: "1/2",
        players: 0,
        min: 100,
        max: 200,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi",
        blinds: "2.5/5",
        players: 0,
        min: 250,
        max: 500,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi",
        blinds: "5/10",
        players: 0,
        min: 500,
        max: 1000,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi",
        blinds: "10/20",
        players: 0,
        min: 1000,
        max: 2000,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi",
        blinds: "25/50",
        players: 0,
        min: 2500,
        max: 5000,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi Lo",
        blinds: ".05/.10",
        players: 0,
        min: 5,
        max: 10,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi Lo",
        blinds: ".1/.2",
        players: 0,
        min: 10,
        max: 20,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi Lo",
        blinds: ".25/.5",
        players: 0,
        min: 25,
        max: 50,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi Lo",
        blinds: "1/2",
        players: 0,
        min: 100,
        max: 200,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi Lo",
        blinds: "2.5/5",
        players: 0,
        min: 250,
        max: 500,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi Lo",
        blinds: "5/10",
        players: 0,
        min: 500,
        max: 1000,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi Lo",
        blinds: "10/20",
        players: 0,
        min: 1000,
        max: 2000,
        handsHr: 0,
      },
      {
        name: generateTableName(),
        game: "Omaha Hi Lo",
        blinds: "25/50",
        players: 0,
        min: 2500,
        max: 5000,
        handsHr: 0,
      },
    ];

    if (games.length * 2 > tableNames.length) {
      return res.status(400).json({ message: 'Not enough unique table names for all the games.' });
    }

    for (const game of games) {

      // Create two of each type of game
      await Game.create({ ...game, name: generateTableName(), deckId: newDeck._id });
      await Game.create({ ...game, name: generateTableName(), deckId: newDeck._id });
    }

    res.status(200).json({ message: "Games initialized successfully." });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/games/view/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Now, instead of finding a table, we directly return the game information
    res.status(200).json({ message: "Viewed game successfully.", game: game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/games", async (req, res) => {
  try {
    const games = await Game.find({});
    res.status(200).json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;