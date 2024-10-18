import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: { 
      type: Boolean, 
      default: false 
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    // profilePicture: {
    //   type: String,
    //   default: "",
    // },
    // createdAt, updatedAt
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
