var express = require("express");
var app = express();

const path = __dirname + "/views/index.html";

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.sendFile(path));
app.get("/json", (req, res) =>
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  })
);

module.exports = app;
