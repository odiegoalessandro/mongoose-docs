import { Router } from "express";
import { createPerson, deletePerson, getAllPeople, getPersonById, udpatePeople } from "../controllers/personController";

const router = Router();

router.post("/", createPerson);
router.get("/", getAllPeople);
router.get("/:id", getPersonById);
router.put("/:id", udpatePeople);
router.delete("/:id", deletePerson);

export default router;