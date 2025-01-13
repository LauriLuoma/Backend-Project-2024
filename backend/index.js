/**
 * Entry point for the Learn Words API.
 * This file sets up the Express server and routes.
 */

const express = require("express");
const path = require("path");
const wordRoutes = require("./routes/wordRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Learn Words API");
});

app.use("/api", wordRoutes);

app.use((req, res) => {
  res.status(404).send({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

process.on("SIGINT", () => {
  console.log("Closing the database connection");
  process.exit();
});
