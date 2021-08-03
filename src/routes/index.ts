import { Router } from 'express';

import { notesController } from '../controllers';

const routes: Router = Router();

routes.get('/notes', notesController.getNotes);
routes.post('/notes', notesController.createNotes);

routes.put('/notes/', notesController.updateNote);
routes.delete('/notes/', notesController.deleteNote);

export default routes;
