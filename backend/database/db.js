/** This is a simple database for the "Learn Words"-app" */

// Importing the necessary modules
const sqlite3 = require("sqlite3").verbose();

// Creating a new SQLite database in memory
const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(
      "Error connectiong to in-memory SQLite database: ",
      err.message,
    );
  }
  console.log("Connected to the in-memory SQlite database.");

  // Creating a new table called "words" with columns for English, Finnish, Swedish and tags
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY,
      english TEXT NOT NULL,
      finnish TEXT NOT NULL,
      swedish TEXT NOT NULL,
      tags TEXT
      )`,
      (err) => {
        if (err) {
          return console.error("Error creating table: ", err.message);
        }
        console.log("Created the table 'words'.");
      },
    );

    // Inserting some base data into the table
    const stmt = db.prepare(
      "INSERT INTO words (english, finnish, swedish, tags) VALUES (?, ?, ?, ?)",
    );
    // Animals
    stmt.run("dog", "koira", "hund", "animals");
    stmt.run("cat", "kissa", "katt", "animals");
    stmt.run("cow", "lehmä", "ko", "animals");
    stmt.run("pig", "sika", "gris", "animals");
    stmt.run("sheep", "lammas", "får", "animals");
    stmt.run("horse", "hevonen", "häst", "animals");

    // Colors
    stmt.run("red", "punainen", "röd", "colors");
    stmt.run("blue", "sininen", "blå", "colors");
    stmt.run("yellow", "keltainen", "gul", "colors");
    stmt.run("green", "vihreä", "grön", "colors");
    stmt.run("black", "musta", "svart", "colors");
    stmt.run("white", "valkoinen", "vit", "colors");

    // Vehicles
    stmt.run("car", "auto", "bil", "vehicles");
    stmt.run("bus", "bussi", "buss", "vehicles");
    stmt.run("train", "juna", "tåg", "vehicles");
    stmt.run("bicycle", "polkupyörä", "cykel", "vehicles");
    stmt.run("truck", "rekka", "lastbil", "vehicles");
    stmt.run("plane", "lentokone", "flygplan", "vehicles");

    stmt.finalize();

    console.log("Inserted some base data into the table 'words'.");
  });
});

module.exports = db;
