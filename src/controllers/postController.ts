import { Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import { PaginationQuery } from "../interfaces/paginationQuery";
import Person from "../models/Person";
import Post from "../models/Post";
import createPostService from "../services/createPostService";

export async function createPost(req: Request, res: Response) {
  const { title, content, author_id } = req.body;

  const person = await Person.findById(author_id);
  
  if (!person) {
    return res.status(404).json({ error: "Author not found" });
  }

  const session: ClientSession = await mongoose.startSession();

  const post = await createPostService(session, person, title, content);

  return res.status(201).json({
    id: post!._id,
    content: post!.content,
    title: post!.title,
    authors: post!.authors,
    create_at: post!.createAt,
    updated_at: post!.updatedAt
  });
}

export async function getAllPosts(req: Request<unknown, unknown, unknown, PaginationQuery>, res: Response) {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 10;

  const totalDocs = await Post.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);

  const postsList = await Person.find()
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    data: postsList,
    totalPages,
    currentPage: page,
  }).status(200);
}

export async function getPostById(req: Request, res: Response) {
  const { id } = req.params;
  const post = Post.findById(id);

  return res.json(post).status(200);
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  await Post.deleteOne({ _id: id });

  return res.status(204).send();
}