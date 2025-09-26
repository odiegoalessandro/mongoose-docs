import { PostCreatedEvent, SignedUpEvent } from "../models/Events";
import Post from "../models/Post";

async function createPost(session, user) {
  try {
    const newSingedUpEvent = await SignedUpEvent.create(
      [{
        title: "New signup in transaction",
        date: new Date(),
        user_id: user._id
      }], { session }
    );

    const [newPost] = await Post.create(
      [{
        title: "Post in transaction",
        content: "This post is created inside a transaction",
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

  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction aborted due to an error:", error);
  } finally {
    await session.endSession();
  }
}

export default createPost;