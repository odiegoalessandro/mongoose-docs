import { ObjectId } from "mongoose";

export interface PostInterface {
  _id?: ObjectId
  title: string;
  content: string;
  createAt: Date;
  updatedAt: Date;
  authors: ObjectId[];
}