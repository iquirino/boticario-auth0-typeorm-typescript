import joi from '@hapi/joi';

interface IError {
  path: string;
  message: string;
  errorCode: string;
}

interface IErrorCollection {
  errors: IError[];
}

interface IValidation<T> {
  error?: IErrorCollection;
  value: T;
}

const validateSchema = <T>(
  schema: joi.ObjectSchema,
  data: T
): IValidation<T> => {
  const { error, value } = schema.validate(data);

  if (error) {
    return {
      error: {
        errors: error?.details?.map((q) => {
          return {
            path: '.body.' + q.path[0],
            message: q.message,
            errorCode: q.type + '.joi.validation',
          };
        }),
      },
      value,
    };
  }

  return { value };
};

export { validateSchema };
