import mongoose from "mongoose";

// discripriminators

const options = { discriminatorKey: "kind", timestamps: true };

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date
}, options);

export const Event = mongoose.model("Event", eventSchema);

export const PostCreatedEvent = Event.discriminator("PostCreated",
  new mongoose.Schema(
    { 
      post_id: { type: mongoose.Types.ObjectId, required: true }, 
      user_id: { type: mongoose.Types.ObjectId, required: true } 
    }, options
  )
);

export const SignedUpEvent = Event.discriminator("SignedUp",
  new mongoose.Schema(
    { user_id: { type: mongoose.Types.ObjectId, required: true } }, options
  )
);
