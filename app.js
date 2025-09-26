const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectToDatabase = require("./config/connectToDatabase");

dotenv.config();


async function main() {
  connectToDatabase();

  if (process.argv.includes("--reset")) {
    await mongoose.connection.dropDatabase();
    console.log("Database dropped");
    process.exit(0);
  }

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
  
  const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: Person }]
  }, { timestamps: true });

  const Post = mongoose.model("Post", postSchema);
  const post = await Post.create({
    title: "My first post",
    content: "This is the content of my first post",
    authors: [diego._id]
  })

  // populate
  
  const myPost = await Post.findById(post._id).populate("authors");
  console.log("myPost:", myPost);
  
  const myPost2 = await Post.findById(post._id);
  console.log("myPost2:", myPost2);
  
  // discripriminators

  const options = { discriminatorKey: "kind" };

  const eventSchema = new mongoose.Schema({
    title: String,
    date: Date
  }, options);

  const Event = mongoose.model("Event", eventSchema);

  const ClickedLinkEvent = Event.discriminator("ClickedLink",
    new mongoose.Schema({ url: String }, options)
  );

  const SignedUpEvent = Event.discriminator("SignedUp",
    new mongoose.Schema({ user: String }, options)
  );

  await Event.deleteMany({});

  await ClickedLinkEvent.create({
    title: "User clicked",
    date: new Date(),
    url: "https://example.com"
  });

  await SignedUpEvent.create({
    title: "New signup",
    date: new Date(),
    user: "Diego"
  });

  const events = await Event.find();
  console.log("Todos:", events);

  const clicks = await ClickedLinkEvent.find();
  console.log("Somente ClickedLink:", clicks);

  await mongoose.disconnect();
}

main().catch(console.error);
