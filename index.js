const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

// app.get("/index.html", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/index.html");

  let name = req.query.name;
  console.log(name);
});

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});

app.get("/main-script.js", (req, res) => {
  res.sendFile(__dirname + "/main-script.js");
});

app.get("/preloader.js", (req, res) => {
  res.sendFile(__dirname + "/preloader.js");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.get("/style-main.css", (req, res) => {
  res.sendFile(__dirname + "/style-main.css");
});

app.get("/img/upload.png", (req, res) => {
  res.sendFile(__dirname + "/img/upload.png");
});

app.get("/img/two_columns.png", (req, res) => {
  res.sendFile(__dirname + "/img/two_columns.png");
});

app.get("/img/three_columns.png", (req, res) => {
  res.sendFile(__dirname + "/img/three_columns.png");
});

app.get("/img/four_columns.png", (req, res) => {
  res.sendFile(__dirname + "/img/four_columns.png");
});

app.get("/img/four_columns.png", (req, res) => {
  res.sendFile(__dirname + "/img/four_columns.png");
});

app.get("/img/close.png", (req, res) => {
  res.sendFile(__dirname + "/img/close.png");
});

app.get("/img/expand.png", (req, res) => {
  res.sendFile(__dirname + "/img/expand.png");
});

app.get("/img/logo.png", (req, res) => {
  res.sendFile(__dirname + "/img/logo.png");
});

app.listen(3000);
