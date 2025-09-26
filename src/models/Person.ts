import mongoose, { HydratedDocument } from "mongoose";
import { PersonInterface } from "../interfaces/PersonInterface";
import { PersonModel } from "../interfaces/PersonModel";
import { PersonMethods } from "../interfaces/PersonMethods";

export type PersonDoc = HydratedDocument<PersonInterface, PersonMethods>;

const personSchema = new mongoose.Schema<PersonInterface>({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  gender: String
});

// método de instância
personSchema.methods.greeting = function (this: PersonDoc) {
  console.log(`Hello, my name is ${this.name}`);
};


const Person = mongoose.model<PersonInterface, PersonModel>("Person", personSchema);

export default Person;
