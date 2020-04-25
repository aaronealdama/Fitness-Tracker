const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

db.Workout.deleteMany({}).then(function () {
  console.log("deleted");
});
