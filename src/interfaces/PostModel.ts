import { Model } from "mongoose";
import { PostInterface } from "./PostInterface";

export interface PostModel extends Model<PostInterface> {}
