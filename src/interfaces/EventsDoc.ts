import { HydratedDocument } from "mongoose";
import { EventInterface, PostCreatedEventInterface, SignedUpEventInterface } from "./EventsInterface";

export type EventDoc = HydratedDocument<EventInterface>;
export type PostCreatedEventDoc = HydratedDocument<PostCreatedEventInterface>;
export type SignedUpEventDoc = HydratedDocument<SignedUpEventInterface>;
