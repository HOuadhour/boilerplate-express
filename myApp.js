var express = require("express");
var app = express();
const bodyParser = require("body-parser");

const path = __dirname + "/views/index.html";

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(__dirname + "/public"));
app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => res.sendFile(path));
app.get("/json", (req, res) =>
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  })
);

function getTime(req, res, next) {
  req.time = new Date().toString();
  next();
}

app.get("/now", getTime, (req, res) => res.json({ time: req.time }));

app.get("/:word/echo", (req, res) => res.json({ echo: req.params.word }));

app.get("/name", (req, res) => {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});

module.exports = app;
