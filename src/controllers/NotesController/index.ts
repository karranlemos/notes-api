import { Request, Response } from 'express';

import codes from '../../app/constants/codes';
import INotesRepository, { INotesFilter } from '../../infra/interfaces/INotesRepository';
import { validateGetNotesQuery } from './validators';

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
    return response.send('create');
  }

  public async updateNote(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return response.send('update');
  }

  public async deleteNote(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return response.send('delete');
  }
}
