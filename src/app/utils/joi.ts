import Joi from 'joi';

export const joiStringifiedArray = Joi.extend((joi) => ({
  type: 'stringifiedArray',
  base: joi.array(),
  messages: {
    'stringifiedArray.invalid': '{{#label}} must be a valid stringified array.',
  },
  coerce(value, helpers) {
    try {
      const array = JSON.parse(value);
      return { value: array };
    } catch (error) {
      return {
        value,
        errors: [
          helpers.error('stringifiedArray.invalid'),
        ],
      };
    }
  },
}));
