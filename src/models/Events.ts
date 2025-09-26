import mongoose from "mongoose";
import { EventInterface, PostCreatedEventInterface, SignedUpEventInterface } from "../interfaces/EventsInterface";
import { EventModel, PostCreatedEventModel, SignedUpEventModel } from "../interfaces/EventsModel";


const options = { discriminatorKey: "kind", timestamps: true };

const eventSchema = new mongoose.Schema<EventInterface>({
  title: String,
  date: Date,
}, options);

export const Event = mongoose.model<EventInterface, EventModel>("Event", eventSchema);

export const PostCreatedEvent = Event.discriminator<PostCreatedEventInterface, PostCreatedEventModel>(
  "PostCreated",
  new mongoose.Schema<PostCreatedEventInterface>({
    post_id: { type: mongoose.Types.ObjectId, required: true },
    user_id: { type: mongoose.Types.ObjectId, required: true },
  }, options)
);

export const SignedUpEvent = Event.discriminator<SignedUpEventInterface, SignedUpEventModel>(
  "SignedUp",
  new mongoose.Schema<SignedUpEventInterface>({
    user_id: { type: mongoose.Types.ObjectId, required: true },
  }, options)
);
