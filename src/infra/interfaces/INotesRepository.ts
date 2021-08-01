export interface INote {
  id: number;
  title: string;
  description: string;
}

export interface INotesFilter {
  ids?: number[] | null;
  title?: string | null;
  description?: string | null;
}

export interface INotesCreate {
  title: string;
  description: string;
}

export interface INotesUpdate {
  id: number;
  title?: string;
  description?: string;
}

export default interface INotesRepository {
  getNotes(notesFilter: INotesFilter): Promise<INote[]>;
  createNotes(notes: INotesCreate[]): Promise<INote[]>;
  updateNotes(notes: INotesUpdate[]): Promise<number>;
  deleteNotes(noteIds: number[]): Promise<number>;
}
