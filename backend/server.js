const express = require("express");
const chats = require("./data/data");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.get("/", (req, res) => {
  res.send("running");
});
app.get("/api/chats", (req, res) => {
  res.send(chats);
});
app.get("/api/chats/:id", (req, res) => {
  const chat = chats.find((c) => c._id == req.params.id);
  res.send(chat);
});

app.listen(process.env.PORT, () => {
  console.log("Started server");
});
