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
      const {
        ids,
        title,
        description,
      }: INotesFilter = validateGetNotesQuery(request.query);

      return response.status(200).json({
        ids,
        title,
        description,
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
