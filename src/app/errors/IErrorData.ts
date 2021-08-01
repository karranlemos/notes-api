import { IObjectOfType } from '../interfaces';

export default interface IErrorData {
  code: string;
  message?: string | null;
  params?: IObjectOfType<unknown>;
  [key: string]: unknown;
}
