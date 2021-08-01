import Joi from 'joi';

import codes from '../../app/constants/codes';
import RequestValidationError from '../../app/errors/RequestValidationError';
import { joiStringifiedArray } from '../../app/utils/joi';
import { INotesFilter } from '../../infra/interfaces/INotesRepository';

export const validateGetNotesQuery = (query: unknown): INotesFilter => {
  const schema = Joi.object({
    ids: joiStringifiedArray
      .stringifiedArray().items(Joi.number().integer())
      .empty('')
      .default(null),
    title: Joi.string().empty('').default(null),
    description: Joi.string().empty('').default(null),
  });

  const { value, error = null } = schema.validate(query);

  if (error !== null) {
    throw new RequestValidationError({
      code: codes.INVALID_PARAMS,
      message: error.details[0].message,
    });
  }

  return value;
};
