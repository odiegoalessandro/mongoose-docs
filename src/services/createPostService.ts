import { ClientSession } from "mongoose";
import { PostCreatedEvent, SignedUpEvent } from "../models/Events";
import { PersonDoc } from "../models/Person";
import Post, { PostDoc } from "../models/Post";

async function createPostService(session: ClientSession, user: PersonDoc, title: String, content: String): Promise<PostDoc | undefined>  {
  try {
    session.startTransaction();
    console.log("Transaction started");

    const newSingedUpEvent = await SignedUpEvent.create(
      [{
        title: "New signup in transaction",
        date: new Date(),
        user_id: user._id
      }], { session }
    );

    const [newPost] = await Post.create(
      [{
        title,
        content,
        authors: [user._id]
      }], { session }
    );

    const newPostCreated = await PostCreatedEvent.create([
      {
        title: "Post created in transaction",
        date: new Date(),
        post_id: newPost._id,
        user_id: user._id
      }], { session }
    );

    await session.commitTransaction();
    console.log("Transaction committed successfully");

    return newPost;

  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction aborted due to an error:", error);
  } finally {
    await session.endSession();
  }
}

export default createPostService;