import MockedNotesRepository
  from '../infra/implementations/mocked/MockedNotesRepository';
import NotesController from './NotesController';

const mockedNotesRepository = new MockedNotesRepository();

export const notesController = new NotesController(mockedNotesRepository);
