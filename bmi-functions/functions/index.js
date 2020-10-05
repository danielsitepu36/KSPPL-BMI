const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
const { validateData } = require("./util/validators");
app.use(cors());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((req, res) => {
//   return res.json("Hello");
// });

const countBMI = (req, res) => {
  const userData = {
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
  };

  const { valid, errors } = validateData(userData);
  if (!valid) return res.status(400).json(errors);

  const result = {
    value: 0,
    category: "Normal",
  };

  BMIWeight = parseFloat(userData.weight);
  BMIHeight = parseFloat(userData.height) / 100.0;

  result.value = BMIWeight / (BMIHeight * BMIHeight);

  if (result.value < 18.5) {
    result.category = "Underweight";
  } else if (result.value < 25) {
    result.category = "Normal";
  } else if (result.value < 30) {
    result.category = "Overweight";
  } else {
    result.category = "Obese";
  }

  return res.json({ result });
};

app.post("/bmi", countBMI);

app.all("*", (req, res, next) => {
  res.status(403).send({ error: "Forbidden" });
});

exports.api = functions.region("asia-southeast2").https.onRequest(app);
