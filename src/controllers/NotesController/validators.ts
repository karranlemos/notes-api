import Joi from 'joi';

import codes from '../../app/constants/codes';
import RequestValidationError from '../../app/errors/RequestValidationError';
import { joiStringifiedArray } from '../../app/utils/joi';
import {
  INotesFilter,
  INotesCreate,
  INotesUpdate,
} from '../../infra/interfaces/INotesRepository';

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

export const validateCreateNotesBody = (body: unknown): INotesCreate[] => {
  const schema = Joi.array().items(
    Joi.object({
      title: Joi.string().empty('').required(),
      description: Joi.string().empty('').required(),
    }),
  );

  const { value, error = null } = schema.validate(body);

  if (error !== null) {
    throw new RequestValidationError({
      code: codes.INVALID_PARAMS,
      message: error.details[0].message,
    });
  }

  return value;
};

export const validateUpdateNotesBody = (body: unknown): INotesUpdate[] => {
  const schema = Joi.array().items(
    Joi.object({
      id: Joi.number().integer().min(0).required(),
      title: Joi.string().empty(''),
      description: Joi.string().empty(''),
    }).xor('title', 'description'),
  );

  const { value, error = null } = schema.validate(body);

  if (error !== null) {
    throw new RequestValidationError({
      code: codes.INVALID_PARAMS,
      message: error.details[0].message,
    });
  }

  return value;
};

export const validateDeleteNotesBody = (body: unknown): number[] => {
  const schema = Joi.array().items(
    Joi.number().integer().min(0).required(),
  );

  const { value, error = null } = schema.validate(body);

  if (error !== null) {
    throw new RequestValidationError({
      code: codes.INVALID_PARAMS,
      message: error.details[0].message,
    });
  }

  return value;
};
