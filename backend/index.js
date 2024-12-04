const express = require("express");
const path = require("path");
const db = require("./database/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Learn Words API");
});

app.get("/api/words", async (req, res) => {
  try {
    const words = await db.getAllWords();
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

process.on("SIGINT", () => {
  console.log("Closing the database connection");
  process.exit();
});
