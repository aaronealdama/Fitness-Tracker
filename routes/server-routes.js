const db = require("../models");

module.exports = function (app) {
  // get routes
  app.get("/api/workouts", function (req, res) {
    db.Workout.find({})
      .then(function (dbWorkout) {
        res.send(dbWorkout);
      })
      .catch(function (err) {
        res.send(err);
      });
  });

  app.get("/api/workouts/range", function (req, res) {
    db.Workout.find({})
      .then(function (dbWorkout) {
        const number = dbWorkout.length / 7;
        if (number > 1) {
          for (let i = 0; i < Math.floor(number); i++) {
            deleteRange(dbWorkout);
          }
        }
        res.send(dbWorkout);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  // post routes
  app.post("/api/workouts", function (req, res) {
    console.log(req.body);
    const obj = {
      day: new Date().setDate(new Date().getDate()),
      exercises: [],
    };
    console.log(obj);
    db.Workout.create(obj)
      .then(function (dbWorkout) {
        res.json(dbWorkout);
        console.log("hi");
      })
      .catch(function ({ message }) {
        console.log(message);
      });
  });

  // put routes
  app.put("/api/workouts/:id", function (req, res) {
    const id = req.params.id;
    const update = req.body;
    db.Workout.findOneAndUpdate(
      { _id: id },
      { $push: { exercises: update } },
      { new: true },
      function (err, doc) {
        if (err) console.log(err);
        res.json(doc);
      }
    );
    console.log("updated");
  });

  // delete routes
};

// outer functions
function deleteRange(arr) {
  for (let i = 0; i < 7; i++) {
    arr.splice(0, 1);
  }
  return arr;
}
