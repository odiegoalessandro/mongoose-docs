import { Model } from "mongoose";
import { PersonInterface } from "./PersonInterface";
import { PersonMethods } from "./PersonMethods";

export interface PersonModel extends Model<PersonInterface, {}, PersonMethods> {}
