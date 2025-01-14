/**Controller to handles the requests*/

const db = require("../database/db");

/**
 * Function to get all words from the database.
 * @async
 * @function getAllWords
 * @returns {Promise<Array>} A promise that resolves to an array of words.
 * @throws Will throw an error if there is an issue with the database query or if no words are found.
 */
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

/**
 * Function to get words by tag from the database.
 * @async
 * @function getWordsByTag
 * @param {string} tag - The tag to filter words by.
 * @returns {Promise<Array>} A promise that resolves to an array of words with the specified tag.
 * @throws Will throw an error if there is an issue with the database query or if no words are found with the specified tag.
 */
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

/**
 * Function to delete a word from the database.
 * @async
 * @function deleteWord
 * @param {number} id - The ID of the word to delete.
 * @returns {Promise<void>} A promise that resolves when the word is deleted.
 * @throws Will throw an error if there is an issue with the database query.
 */
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

/**
 * Function to add a new word to the database.
 * @async
 * @function addWord
 * @param {Object} word - The word object to add.
 * @param {string} engTrans - The English translation of the word.
 * @param {string} finTrans - The Finnish translation of the word.
 * @param {string} sweTrans - The Swedish translation of the word.
 * @param {string} tags - The tags associated with the word.
 * @returns {Promise<void>} A promise that resolves when the word is added.
 * @throws Will throw an error if there is an issue with the database query.
 */
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

/**
 * Function to update an existing word in the database.
 * @async
 * @function updateWord
 * @param {number} id - The ID of the word to update.
 * @param {Object} word - The word object with updated values.
 * @param {string} engTrans - The updated English translation of the word.
 * @param {string} finTrans - The updated Finnish translation of the word.
 * @param {string} sweTrans - The updated Swedish translation of the word.
 * @param {string} tags - The updated tags associated with the word.
 * @returns {Promise<void>} A promise that resolves when the word is updated.
 * @throws Will throw an error if there is an issue with the database query.
 */
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
