const functions = require("firebase-functions");
const express = require("express");
const app = express();
// const cors = require("cors");
// app.use(cors());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const countBMI = (req, res) => {
  const userData = {
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
  };
  if (userData.weight == null || userData.height == null) {
    return res.status(400).json({ error: "Data is not complete" });
  }

  BMIWeight = parseFloat(userData.weight);
  BMIHeight = parseFloat(userData.height) / 100.0;
  if (!BMIHeight > 0 || !BMIWeight > 0) {
    return res
      .status(400)
      .json({ error: "Data must be a number & bigger than 0" });
  }

  BMI = BMIWeight / (BMIHeight * BMIHeight);

  return res.json({ BMI });
};

app.post("/bmi", countBMI);

app.all("*", (req, res, next) => {
  res.status(403).send({ error: "Forbidden" });
});

exports.api = functions.region("asia-southeast2").https.onRequest(app);
