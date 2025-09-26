const mongoose = require("mongoose");

// learning about schemas and models

const personSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  gender: String
}, {
  methods: {
    greeting() {
      console.log(`Hello, my name is ${this.name}`);
    }
  },
  statics: {
    findByName(name) {
      return this.find({ name: new RegExp(name, "i") });
    }
  }
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person