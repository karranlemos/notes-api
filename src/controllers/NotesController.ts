import { Request, Response } from "express";

export default class NotesController {
  public constructor() {
    this.getNotes = this.getNotes.bind(this);
    this.createNotes = this.createNotes.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  public async getNotes(
    request: Request,
    response: Response
  ): Promise<Response> {
    return response.send("get");
  }

  public async createNotes(
    request: Request,
    response: Response
  ): Promise<Response> {
    return response.send("create");
  }

  public async updateNote(
    request: Request,
    response: Response
  ): Promise<Response> {
    return response.send("update");
  }

  public async deleteNote(
    request: Request,
    response: Response
  ): Promise<Response> {
    return response.send("delete");
  }
}
