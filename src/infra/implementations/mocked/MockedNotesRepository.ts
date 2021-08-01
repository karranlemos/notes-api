import { cloneDeep } from 'lodash';

import { IObjectOfType } from '../../../app/interfaces';
import INotesRepository, {
  INote,
  INotesFilter,
  INotesUpdate,
  INotesCreate,
} from '../../interfaces/INotesRepository';

export default class MockedNotesRepository implements INotesRepository {
  async getNotes({
    ids = null,
    title = null,
    description = null,
  }: INotesFilter = {}): Promise<INote[]> {
    const filteredNotes = Object.values(mockedDatabase).filter((note) => {
      if (Array.isArray(ids) && ids.includes(note.id)) {
        return true;
      }

      if (title !== null && new RegExp(title, 'i').test(note.title)) {
        return true;
      }

      if (
        description !== null
        && new RegExp(description, 'i').test(note.description)
      ) {
        return true;
      }

      return false;
    });

    return cloneDeep(filteredNotes);
  }

  async createNotes(notes: INotesCreate[]): Promise<INote[]> {
    const newRows = [];

    for (const note of notes) {
      const newRow = {
        ...note,
        id: nextId,
      };
      newRows.push(newRow);
      mockedDatabase[nextId] = newRow;
      nextId += 1;
    }

    return cloneDeep(newRows);
  }

  async updateNotes(notes: INotesUpdate[]): Promise<number> {
    let numberUpdatedNotes = 0;

    for (const note of notes) {
      if (!Object.prototype.hasOwnProperty.call(mockedDatabase, note.id))
        continue;

      if (note.title === undefined && note.description === undefined)
        continue;

      numberUpdatedNotes += 1;

      if (note.title !== undefined)
        mockedDatabase[note.id].title = note.title;

      if (note.description !== undefined)
        mockedDatabase[note.id].description = note.description;
    }

    return numberUpdatedNotes;
  }

  async deleteNotes(noteIds: number[]): Promise<number> {
    let numberDeletedRows = 0;

    for (const noteId of noteIds) {
      if (!Object.prototype.hasOwnProperty.call(mockedDatabase, noteId))
        continue;

      numberDeletedRows += 1;

      delete mockedDatabase[noteId];
    }

    return numberDeletedRows;
  }
}

let nextId = 0;
const mockedDatabase: IObjectOfType<INote> = {};
