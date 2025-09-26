const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectToDatabase = require("./config/connectToDatabase");
const createPost = require("./services/createPost");
const Person = require("./models/Person");
const Post = require("./models/Post");
const { Event } = require("./models/Events");
const { SignedUpEvent } = require("./models/Events");
const { PostCreatedEvent } = require("./models/Events");

dotenv.config();


async function main() {
  connectToDatabase();

  if (process.argv.includes("--reset")) {
    await mongoose.connection.dropDatabase();
    console.log("Database dropped");
    process.exit(0);
  }

  let diego = undefined;

  // querys and updates
  
  if(await Person.findOne({ email: "diego.martins@agxsoftware.com" })){
    console.log("Diego ja existe")
    diego = await Person.findOne({ email: "diego.martins@agxsoftware.com" });
  } else {
    diego = await Person.create({ name: "Diego", age: 19, gender: "Male", email: "diego.martins@agxsoftware.com" });
  }

  diego.greeting();

  await Person.updateOne({ email: "diego.martins@agxsoftware.com" }, { $set: { age: 20 } });

  // transactions

  const session = await mongoose.startSession();
  session.startTransaction();

  await createPost(session, diego);

  // populate
  
  const myPost = await Post.find().populate("authors");
  console.log("myPost:", myPost);

  // mongoose possibilities get all events or just one type of then

  const allEvents = await Event.find();
  console.log("All events:", allEvents);

  const allSignedUpEvents = await SignedUpEvent.find();
  console.log("All SignedUp events:", allSignedUpEvents);
  
  const allPostCreatedEvents = await PostCreatedEvent.find();
  console.log("All PostCreated events:", allPostCreatedEvents);

  await mongoose.disconnect();
}

main().catch(console.error);
