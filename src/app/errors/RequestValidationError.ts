import codes from '../constants/codes';
import BaseError from './BaseError';
import IErrorData from './IErrorData';

export default class RequestValidationError extends BaseError {
  public constructor({
    code = codes.REQUEST_VALIDATION_ERROR,
    message = null,
    ...data
  }: IErrorData) {
    super({ code, message, ...data });
  }
}
