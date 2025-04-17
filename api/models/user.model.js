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
    profilePicture: {
      type: String,
      default:
        "https://imgs.search.brave.com/wHstbemUJ_5hUnEzGzIHzqpYXU9kwz9KH1LLuFHsdmQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzA4LzM1/LzBjLzA4MzUwY2Fm/YTRmYWJiOGE2YTFi/ZTJkOWYxOGYyZDg4/LmpwZw",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Export the model
const User = mongoose.model("User", userSchema);

export default User;
