const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const { userModel, counterModel } = require("./models");

const url = "mongodb://127.0.0.1:27017/profile-management";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("Connection error:", err);
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create", async (req, res) => {
  const { name, age, gender, occupation, interests } = req.body;
  console.log("Received post request to create a new user " + JSON.stringify(req.body));

  let counterId = await counterModel.findOneAndUpdate(
    { id: "autoval" },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  );

  const profile = new userModel({
    id: counterId.seq,
    name: name,
    age: age,
    gender: gender,
    occupation: occupation,
    interests: interests,
  });
  try {
    profile.save();
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
