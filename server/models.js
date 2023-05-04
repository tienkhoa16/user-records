const mongoose = require("mongoose");

/**
 * Schema for a user's profile.
 */
const UserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    interests: {
      type: String,
      required: true,
    },
  },
  { collection: "profiles" }
);

/**
 * Schema for an auto-increment counter.
 * It is used for auto generating the user id.
 */
const CounterSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    seq: {
      type: Number,
    },
  },
  { collection: "counters" }
);

const User = mongoose.model("User", UserSchema);
const Counter = mongoose.model("Counter", CounterSchema);

module.exports = {
  userModel: User,
  counterModel: Counter,
};
