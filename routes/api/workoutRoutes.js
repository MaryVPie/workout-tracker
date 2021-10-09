const router = require("express").Router();
const db = require('../../models');


function extendWorkout(workout) {
  let newWo = Object.assign({},workout.toObject())
      newWo.totalDuration = 
      newWo.exercises == null || newWo.exercises.length ==0 
            ? 0 
            : newWo.exercises
              .map(ex => ex.duration)
              .reduce((previousValue, currentValue) => previousValue + currentValue);
            console.log("new workout:", newWo);
      return newWo;
};

router.get('/', async (req, res) => {
  try {
    console.log(req.body);
    let getAll = await db.Workout.find({});
    getAll = getAll.map(workout => extendWorkout(workout)).sort((a,b) => {
      return a.day- b.day;
    });
    console.log(getAll);
    res.json(getAll);
  }
  catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log("bknmsikg", req.params);
    console.log("bknmsikg", req.body);
    if (req.params.id == 'undefined') {
      let exer = [];
      exer.push(req.body);
      let newWorkout = { exercises: exer };
      let result = await db.Workout.create(newWorkout);
      console.log(result);
      res.status(200);
    } else {
      let updatedId = await db.Workout.updateOne(
        { _id: req.params.id }, {
        $push: {
          exercises: req.body
        }
      }
      );
      console.log(updatedId);
      res.json(updatedId);
    }

  }
  catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    console.log("inside post");
    let savedThing = await db.Workout.create({});
    console.log("New workout from post", savedThing);
    res.status(200).json(savedThing);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/range', async (req, res) => {
  try {
    console.log("Inside of range meth0d");
    console.log(req.params);
    console.log(req.body);
    let workoutsInRange = await db.Workout.find({ }, null, { $sort: 1, $limit: 7 });
console.log(workoutsInRange);

    workoutsInRange = workoutsInRange.map(workout => extendWorkout(workout)).sort((a,b) => {
      return a.day- b.day;
    });
    console.log("resulting workouts", workoutsInRange);
    res.status(200).json(workoutsInRange);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


module.exports = router;
