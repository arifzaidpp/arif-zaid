import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 13,
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
