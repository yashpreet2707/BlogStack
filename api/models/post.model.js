import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
        type:String,
        required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image:{
        type:String,
        default: "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg",
    },
    category: {
        type: String,
        default: 'uncategorized'
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const Post = mongoose.model("Post", postSchema);

export default Post;
