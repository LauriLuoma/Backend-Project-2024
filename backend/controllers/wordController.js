/**Controller to handles the requests */

const db = require("../database/db");

// Function to get all words from the database
const getAllWords = async () => {
  const query = `SELECT * FROM words ORDER BY id`;
  return new Promise((resolve, reject) => {
    db.all(query, (err, results) => {
      if (err) {
        reject("Error recievig all words", err);
      } else if (results.length === 0) {
        reject("No words found in the database");
      } else {
        resolve(results);
      }
    });
  });
};

const getWordsByTag = async (tag) => {
  const query = `SELECT * FROM words WHERE tags = ? ORDER BY id`;
  return new Promise((resolve, reject) => {
    db.all(query, [tag], (err, results) => {
      if (err) {
        reject("Error recieving words by tag", err);
      } else if (results.length === 0) {
        reject(`No words found with tag ${tag}`);
      } else {
        resolve(results);
      }
    });
  });
};

// Function to delete a word from the database
const deleteWord = async (id) => {
  const query = `DELETE FROM words WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [id], (err) => {
      if (err) {
        reject("Error deleting the word", err);
      } else {
        resolve({
          message: `Word with id ${id} deleted`,
        });
      }
    });
  });
};

// Function to add a new word to the database
// The function takes in the English, Finnish and Swedish translations of the word, as well as the tags
// The translations are required, so they cannot be empty
// The tags are not required, so they can be empty
const addWord = async (engTrans, finTrans, sweTrans, tags) => {
  const query = `INSERT INTO words (english, finnish, swedish, tags) VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [engTrans, finTrans, sweTrans, tags], (err) => {
      if (err) {
        reject("Error adding the word", err);
      } else {
        resolve({
          message: `Word added`,
        });
      }
    });
  });
};

// Function to update a word in the database
// The fuction takes in the id of the word and the new translations and tags
// The translations are required, tags are not
const updateWord = async (id, engTrans, finTrans, sweTrans, tags) => {
  const query = `UPDATE words SET english = ?, finnish = ?, swedish = ?, tags = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [engTrans, finTrans, sweTrans, tags, id], (err) => {
      if (err) {
        reject("Error updating the word", err);
      } else {
        resolve({
          message: `Word with id ${id} updated`,
        });
      }
    });
  });
};

module.exports = {
  getAllWords,
  deleteWord,
  addWord,
  updateWord,
  getWordsByTag,
};
