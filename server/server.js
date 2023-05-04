const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const { userModel, counterModel } = require("./models");
const logger = require("./logger");

const url = "mongodb://127.0.0.1:27017/profile-management";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", (_) => {
  logger.info("Database connected: " + url);
});

db.on("error", (err) => {
  logger.error("Connection error:", err);
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create", async (req, res) => {
  const { name, age, gender, occupation, interests } = req.body;
  logger.info("Received post request to create a new user " + JSON.stringify(req.body));

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
    logger.info("Successfully created profile " + JSON.stringify(profile));
    profile.save();
    res.sendStatus(200);
  } catch (e) {
    logger.error("Error while creating profile " + e);
    res.status(500).send(e);
  }
});

app.get("/view", async (req, res) => {
  logger.info("Received get all user records request");
  const users = await userModel.find({});
  try {
    res.send(users);
    logger.info("Successfully sent back all user records");
  } catch (e) {
    logger.error("Error while getting user records " + e);
    res.status(500).send(e);
  }
});

app.delete("/delete", async (req, res) => {
  const { id } = req.body;
  logger.info("Delete user id " + id);
  try {
    const result = await userModel.findOneAndDelete({ id: id });
    if (result !== null) {
      logger.info("Successfully deleted " + JSON.stringify(result));
      res.sendStatus(200);
    } else {
      logger.error("No documents matched the query. Deleted 0 documents.");
    }
  } catch (e) {
    logger.error("Error while deleting user record " + e);
    res.status(500).send(e);
  }
});

app.put("/modify", async (req, res) => {
  const { id, name, age, gender, occupation, interests } = req.body;
  logger.info(
    "Modify user id " +
      id +
      " to " +
      JSON.stringify({ id, name, age, gender, occupation, interests })
  );
  try {
    const result = await userModel.updateOne(
      { id: id },
      {
        $set: {
          id: id,
          name: name,
          age: age,
          gender: gender,
          occupation: occupation,
          interests: interests,
        },
      }
    );
    if (result.matchedCount > 0) {
      logger.info("Successfully modified user ID " + JSON.stringify(id));
      res.sendStatus(200);
    } else {
      logger.error("No documents matched the ID. Modified 0 documents.");
    }
  } catch (e) {
    logger.error("Error while modifying user record " + e);
    res.status(500).send(e);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, logger.info(`Server started on port ${PORT}`));
