const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");

/**
 * Route to get all words or words by tag.
 * @async
 * @function
 * @param {string} tag - Optional tag to filter words by.
 * @returns {JSON} - A JSON response containing an array of words.
 * @throws {500} - If there is an error retrieving the words.
 */
router.get("/words/:tag?", async (req, res) => {
  try {
    const tag = req.params.tag;
    let words;
    if (tag) {
      words = await wordController.getWordsByTag(tag);
    } else {
      words = await wordController.getAllWords();
    }
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route to delete a word.
 * @async
 * @function
 * @param {number} req.params.id - The ID of the word to delete.
 * @returns {JSON} - A JSON response containing a success message.
 * @throws {500} - If there is an error deleting the word.
 */
router.delete("/words/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await wordController.deleteWord(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route to add a new word.
 * @async
 * @function
 * @param {Object} req.body - The word object to add.
 * @param {string} english - The English translation of the word.
 * @param {string} finnish - The Finnish translation of the word.
 * @param {string} swedish - The Swedish translation of the word.
 * @param {string} tags - The tags associated with the word.
 * @returns {JSON} - A JSON response containing a success message.
 * @throws {500} - If there is an error adding the word.
 */
router.post("/words", async (req, res) => {
  try {
    const { english, finnish, swedish, tags } = req.body;
    if (!english) {
      console.error("English translation is required");
      return res.status(400).json({
        error: "English translation is required",
      });
    }
    if (!finnish) {
      console.error("Finnish translation is required");
      return res.status(400).json({
        error: "Finnish translation is required",
      });
    }
    if (!swedish) {
      console.error("Swedish translation is required");
      return res.status(400).json({
        error: "Swedish translation is required",
      });
    }
    const result = await wordController.addWord(
      english,
      finnish,
      swedish,
      tags,
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route to update an existing word.
 * @async
 * @function
 * @param {number} id - The ID of the word to update.
 * @param {string} english - The updated English translation of the word.
 * @param {string} finnish - The updated Finnish translation of the word.
 * @param {string} swedish - The updated Swedish translation of the word.
 * @param {string} tags - The updated tags associated with the word.
 * @returns {JSON} - A JSON response containing a success message.
 * @throws {500} - If there is an error updating the word.
 */
router.put("/words/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { english, finnish, swedish, tags } = req.body;
    if (!english) {
      console.error("English translation is required");
      return res.status(400).json({
        error: "English translation is required",
      });
    }
    if (!finnish) {
      console.error("Finnish translation is required");
      return res.status(400).json({
        error: "Finnish translation is required",
      });
    }
    if (!swedish) {
      console.error("Swedish translation is required");
      return res.status(400).json({
        error: "Swedish translation is required",
      });
    }
    const result = await wordController.updateWord(
      id,
      english,
      finnish,
      swedish,
      tags,
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
