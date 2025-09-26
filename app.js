const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.7sdbh44.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

  const personSchema = new mongoose.Schema({
    name: String,
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
  const diego = await Person.create({ name: "Diego", age: 19, gender: "Male" });

  diego.greeting();

  const people = await Person.findOne({ name: "Diego" });
  console.log("findByName:", people);

  await Person.updateOne({ name: "Diego" }, { $set: { age: 20 } });
  
  const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }]
  });

  const Post = mongoose.model("Post", postSchema);
  const post = await Post.create({
    title: "My first post",
    content: "This is the content of my first post",
    authors: [people._id]
  })

  const myPost = await Post.findById(post._id).populate("authors");
  console.log("myPost:", myPost);
  
  const myPost2 = await Post.findById(post._id);
  console.log("myPost2:", myPost2);

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

  const messageSchema = new mongoose.Schema({
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Person" }
  }, { 
    timestamps: true
  });

  const Message = mongoose.model("Message",  messageSchema);

  await Message.create({
    text: "Hello, world!",
    author: diego._id
  });

  const message = await Message.findOne().populate("author");
  console.log("message:", message);

  await mongoose.disconnect();

}

main().catch(console.error);
