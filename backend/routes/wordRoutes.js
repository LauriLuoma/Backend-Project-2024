const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");

// Route for all words
router.get("/words", async (req, res) => {
  try {
    const words = await wordController.getAllWords();
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a word by id
router.delete("/words/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await wordController.deleteWord(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a new word
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

// Route to update a word by id
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
