import { Request, Response } from "express";
import { PaginationQuery } from "../interfaces/paginationQuery";
import Person from "../models/Person";

export async function createPerson(req: Request, res: Response){
  const { name, age, gender, email } = req.body;
  
  const person = await Person.create({
    name,
    age,
    gender,
    email
  });

  res.status(201).json(person);
}

export async function getAllPeople(req: Request<unknown, unknown, unknown, PaginationQuery>, res: Response){
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 10;

  const totalDocs = await Person.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);

  const peopleList = await Person.find()
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    data: peopleList,
    totalPages,
    currentPage: page,
  });
}

export async function getPersonById(req: Request, res: Response){
  const { id } = req.params;
  const person = Person.findById(id);
  
  res.send(person).status(200);
}

export async function udpatePeople(req: Request, res: Response) {
const { id, name, age } = req.body;

  if(name){
    await Person.updateOne({ id }, { name })
  }

  if(age){
    await Person.updateOne({ id }, { age })
  }

  const updatedPerson = await Person.findById(id);
  
  res.status(200).json(updatedPerson);
}

export async function deletePerson(req: Request, res: Response){
  const { id } = req.params;
  const deletedPerson = await Person.findByIdAndDelete(id);
 
  res.status(204).send();
}