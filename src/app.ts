import dotenv from "dotenv";
import mongoose, { ClientSession } from "mongoose";
import connectToDatabase from "./config/connectToDatabase";
import { Event, PostCreatedEvent, SignedUpEvent } from "./models/Events";
import Person, { PersonDoc } from "./models/Person";
import Post from "./models/Post";
import createPost from "./services/createPost";

dotenv.config();

async function main() {
  await connectToDatabase();

  if (process.argv.includes("--reset")) {
    await mongoose.connection.dropDatabase();
    console.log("Database dropped");
    process.exit(0);
  }

  let diego: PersonDoc | null = await Person.findOne({ email: "diego.martins@agxsoftware.com" });

  if (diego) {
    console.log("Diego já existe");
  } else {
    diego = await Person.create({
      name: "Diego",
      age: 19,
      gender: "Male",
      email: "diego.martins@agxsoftware.com",
    });
  }

  diego.greeting();

  await Person.updateOne(
    { email: "diego.martins@agxsoftware.com" },
    { $set: { age: 20 } }
  );

  // transactions
  const session: ClientSession = await mongoose.startSession();
  session.startTransaction();

  await createPost(session, diego);

  // populate
  const myPost = await Post.find().populate("authors");
  console.log("myPost:", myPost);

  // events
  const allEvents = await Event.find();
  console.log("All events:", allEvents);

  const allSignedUpEvents = await SignedUpEvent.find();
  console.log("All SignedUp events:", allSignedUpEvents);

  const allPostCreatedEvents = await PostCreatedEvent.find();
  console.log("All PostCreated events:", allPostCreatedEvents);

  await mongoose.disconnect();
}

main().catch(console.error);
