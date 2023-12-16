import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
  likes: [String],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      message: String,
      likes: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  virtuals: {
    totalLikes: {
      get() {
        return this.likes.length;
      }
    }
  },
  toJSON: { virtuals: true }
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
