import mongoose from "mongoose";
import Person from "./Person";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: Person }]
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;