import mongoose, { HydratedDocument } from "mongoose";
import { PostInterface } from "../interfaces/PostInterface";
import { PostModel } from "../interfaces/PostModel";

const postSchema = new mongoose.Schema<PostInterface>({
  title: String,
  content: String,
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true }); 

type PostDoc = HydratedDocument<PostInterface>;

const Post = mongoose.model<PostInterface, PostModel>("Post", postSchema);

export default Post;