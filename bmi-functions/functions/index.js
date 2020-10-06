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
    LWeight: 0,
    HWeight: 0,
  };

  BMIWeight = parseFloat(userData.weight);
  BMIHeight = parseFloat(userData.height) / 100.0;

  result.value = BMIWeight / (BMIHeight * BMIHeight);

  const BMIRating = {
    lowest: "Very severely underweight",
    v_low: "Very underweight",
    low: "Underweight",
    norm: "Normal",
    high: "Overweight",
    v_high1: "Obese Class I (Moderately obese)",
    v_high2: "Obese Class II (Severely obese)",
    highest: "Obese Class III (Very severely obese)",
  };

  if (result.value < 18.5) {
    result.LWeight = 18.5 * (BMIHeight * BMIHeight);
    result.HWeight = 25 * (BMIHeight * BMIHeight);
    if (result.value < 15) {
      result.category = BMIRating.lowest;
    } else if (result.value < 16) {
      result.category = BMIRating.v_low;
    } else {
      result.category = BMIRating.low;
    }
  } else if (result.value < 25) {
    result.category = BMIRating.norm;
  } else {
    result.LWeight = 18.5 * (BMIHeight * BMIHeight);
    result.HWeight = 25 * (BMIHeight * BMIHeight);
    if (result.value < 30) {
      result.category = BMIRating.high;
    } else if (result.value < 35) {
      result.category = BMIRating.v_high1;
    } else if (result.value < 40) {
      result.category = BMIRating.v_high2;
    } else {
      result.category = BMIRating.highest;
    }
  }

  return res.json({ result });
};

app.post("/bmi", countBMI);

app.all("*", (req, res, next) => {
  res.status(403).send({ error: "Forbidden" });
});

exports.api = functions.region("asia-southeast2").https.onRequest(app);
