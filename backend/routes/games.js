
const router = require("express").Router();

const Games = require("../models/gamesSchema")

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
];

function generateTableName() {
  const randomName = tableNames[Math.floor(Math.random() * tableNames.length)];
  return randomName;
}

router.post("/games/initialize", async (req, res) => {
  try {
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

    // Create two of each type of game
    for (const game of games) {
      await Games.create({ ...game });
      await Games.create({ ...game, name: generateTableName() });
    }

    res.status(200).json({ message: "Games initialized successfully." });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: error.toString() });
  }
});



router.post("/games/join/:id", async (req, res) => {
  try {
    const game = await Games.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    if (game.players >= 6) {
      const newGame = await Games.create({
        ...game.toObject(),
        _id: mongoose.Types.ObjectId(),
        name: generateTableName(),
        players: 0,
      });

      res
        .status(200)
        .json({
          message: "Game is full. A new game was created.",
          game: newGame,
        });
    } else {
      game.players += 1;
      await game.save();

      res
        .status(200)
        .json({ message: "Joined game successfully.", game: game });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/games", async (req, res) => {
  try {
    const games = await Games.find({});
    res.status(200).json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
