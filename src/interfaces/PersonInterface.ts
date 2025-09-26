import { ObjectId } from "mongoose";

export interface PersonInterface {
  _id?: ObjectId
  name?: string;
  readonly email: string
  age?: number;
  gender?: string;
}