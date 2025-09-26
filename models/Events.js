const mongoose = require("mongoose");
const Post  = require("./Post");

// discripriminators

const options = { discriminatorKey: "kind", timestamps: true };

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date
}, options);

const Event = mongoose.model("Event", eventSchema);

const PostCreatedEvent = Event.discriminator("PostCreated",
  new mongoose.Schema(
    { 
      post_id: { type: mongoose.Types.ObjectId, required: true }, 
      user_id: { type: mongoose.Types.ObjectId, required: true } 
    }, options
  )
);

const SignedUpEvent = Event.discriminator("SignedUp",
  new mongoose.Schema(
    { user_id: { type: mongoose.Types.ObjectId, required: true } }, options
  )
);


module.exports = { Event, SignedUpEvent, PostCreatedEvent };