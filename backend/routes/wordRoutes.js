const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");

router.get("/words", async (req, res) => {
  try {
    const words = await wordController.getAllWords();
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/words/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await wordController.deleteWord(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
