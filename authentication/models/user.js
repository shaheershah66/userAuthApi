import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
});

const User = model("User", userSchema);

export default User;
