import { Model } from "mongoose";
import { EventInterface, PostCreatedEventInterface, SignedUpEventInterface } from "./EventsInterface";

export type EventModel = Model<EventInterface>;
export type PostCreatedEventModel = Model<PostCreatedEventInterface>;
export type SignedUpEventModel = Model<SignedUpEventInterface>;
