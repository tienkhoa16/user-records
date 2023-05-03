const mongoose = require("mongoose");

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
