import { Router } from "express";

import { notesController } from "../controllers";

const routes: Router = Router();

routes.get("/notes", notesController.getNotes);
routes.post("/notes", notesController.createNotes);

routes.put("/note/:id", notesController.updateNote);
routes.delete("/note/:id", notesController.deleteNote);

export default routes;
