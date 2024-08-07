const express = require("express");
const app = express();
const db = require("./db");
const passport = require('./auth');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Middleware Function
const logrequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next();
};

app.use(logrequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false})
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/server", function (req, res) {
  res.send("yes, the server is up");
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", localAuthMiddleware, personRoutes);

const foodRoutes = require("./routes/foodroutes");
app.use("/food", foodRoutes);

app.listen(3000);
