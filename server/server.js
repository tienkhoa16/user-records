const express = require("express");
const cors = require("cors");
const logger = require("./logger");

const mongoose = require("mongoose");
const { userModel, counterModel } = require("./models");

/**
 * Establishes connection with database.
 */
const url = "mongodb://127.0.0.1:27017/profile-management";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;

/**
 * Check connection status with database.
 */
db.once("open", (_) => {
  logger.info("Database connected: " + url);
});

db.on("error", (err) => {
  logger.error("Connection error:", err);
});

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Handles POST request from the client when a new user profile is created.
 * The user ID will be auto-increment here and assign to the profile.
 * It expects the `req` body to contain { name, age, gender, occupation, interests }.
 *
 * Responses code 200 to client on success.
 * Otherwise, responses code 500 with the error.
 */
app.post("/create", async (req, res) => {
  try {
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
    logger.info("Successfully created profile " + JSON.stringify(profile));
    profile.save();
    res.sendStatus(200);
  } catch (e) {
    logger.error("Error while creating profile " + e);
    res.status(500).send(e);
  }
});

/**
 * Handles GET request from the client to view the list of all user profiles.
 *
 * Responses all user records on successful creation.
 * Otherwise, responses code 500 with the error.
 */
app.get("/view", async (req, res) => {
  try {
    logger.info("Received get all user records request");
    const users = await userModel.find({});
    res.send(users);
    logger.info("Successfully sent back all user records");
  } catch (e) {
    logger.error("Error while getting user records " + e);
    res.status(500).send(e);
  }
});

/**
 * Handles DELETE request from the client when they want to delete a user profile
 * based on the user ID.
 *
 * It expects the `req` body to contain { id } which is the user ID.
 *
 * Responses code 200 to client on successful deletion.
 * Otherwise, responses code 500 with the error.
 */
app.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    logger.info("Delete user id " + id);
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

/**
 * Handles PUT request from the client when they want to update a user profile
 * based on the user ID.
 *
 * It expects the `req` body to contain { id, name, age, gender, occupation, interests }.
 *
 * Responses code 200 to client on successful modification.
 * Otherwise, responses code 500 with the error.
 */
app.put("/modify", async (req, res) => {
  try {
    const { id, name, age, gender, occupation, interests } = req.body;
    logger.info(
      "Modify user id " +
        id +
        " to " +
        JSON.stringify({ id, name, age, gender, occupation, interests })
    );
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

/**
 * Starts the server on port 8000.
 */
const PORT = process.env.PORT || 8000;
app.listen(PORT, logger.info(`Server started on port ${PORT}`));
