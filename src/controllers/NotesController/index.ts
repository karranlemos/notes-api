import { Request, Response } from 'express';

import codes from '../../app/constants/codes';
import INotesRepository, {
  INotesFilter,
  INotesCreate,
  INotesUpdate,
} from '../../infra/interfaces/INotesRepository';
import {
  validateGetNotesQuery,
  validateCreateNotesBody,
  validateUpdateNotesBody,
} from './validators';

export default class NotesController {
  public constructor(
    private notesRepository: INotesRepository,
  ) {
    this.getNotes = this.getNotes.bind(this);
    this.createNotes = this.createNotes.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  public async getNotes(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const notesFilter: INotesFilter = validateGetNotesQuery(request.query);
      const notesFetched = await this.notesRepository.getNotes(notesFilter);

      return response.status(200).json(notesFetched);
    } catch (error) {
      switch (error?.getCode()) {
        case codes.INVALID_PARAMS:
          return response.status(400).json({
            code: error.getCode(),
            message: error.message,
          });
        default:
          break;
      }

      return response.status(500).send();
    }
  }

  public async createNotes(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const notesToCreate: INotesCreate[] = validateCreateNotesBody(request.body);
      const notesCreated = await this.notesRepository.createNotes(notesToCreate);

      return response.status(200).json(notesCreated);
    } catch (error) {
      switch (error?.getCode()) {
        case codes.INVALID_PARAMS:
          return response.status(400).json({
            code: error.getCode(),
            message: error.message,
          });
        default:
          break;
      }

      return response.status(500).send();
    }
  }

  public async updateNote(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const notesToUpdate: INotesUpdate[] = validateUpdateNotesBody(request.body);
      const numberNotesUpdated = await this.notesRepository.updateNotes(notesToUpdate);

      return response.status(200).json({
        notes_updated: numberNotesUpdated,
      });
    } catch (error) {
      switch (error?.getCode()) {
        case codes.INVALID_PARAMS:
          return response.status(400).json({
            code: error.getCode(),
            message: error.message,
          });
        default:
          break;
      }

      return response.status(500).send();
    }
  }

  public async deleteNote(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return response.send('delete');
  }
}
