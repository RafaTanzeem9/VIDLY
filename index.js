const express = require("express");

const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

app.get("/", (req, res) => {
  res.send("Movies");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((e) => e.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("genre not found with that ID");
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("not found genre with that id");
  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("not found genre with that id");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`lisening port ${port}`);
