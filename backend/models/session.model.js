import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      required: true
    },
    lab: {
      type: String,
      required: true,
    },
    endTime: {
      type: Date
    },
    compensation: {
      type: Number,
      default: 0
    },
  }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
