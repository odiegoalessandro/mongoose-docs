import { ObjectId } from "mongoose";

export interface EventInterface {
  title: string;
  date: Date;
  kind: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostCreatedEventInterface extends EventInterface {
  post_id: ObjectId;
  user_id: ObjectId;
}

export interface SignedUpEventInterface extends EventInterface {
  user_id: ObjectId;
}