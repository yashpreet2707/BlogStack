import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Export the model
const User = mongoose.model("User", userSchema);

export default User;
