import { ValidationError } from '../helpers/errors.js';

/*

  validateRequiredFields - Valida que campos requeridos existan

*/
export const validateRequiredFields = (fields) => {
  return (req, res, next) => {
    const missingFields = [];

    // Verificar cada campo
    fields.forEach((field) => {
      if (!req.body[field] || !req.body[field].toString().trim()) {
        missingFields.push(field);
      }
    });

    // Si hay campos faltantes
    if (missingFields.length > 0) {
      const error = new ValidationError(
        `Missing required fields: ${missingFields.join(', ')}`
      );
      return next(error);
    }

    // Pasar al siguiente middleware
    next();
  };
};

/*

  validateEmail - Valida formato de email

*/
export const validateEmail = (fieldName = 'email') => {
  return (req, res, next) => {
    const email = req.body[fieldName];

    if (!email) {
      const error = new ValidationError(`${fieldName} is required`);
      return next(error);
    }

    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      const error = new ValidationError(`Invalid email format`);
      return next(error);
    }

    next();
  };
};

/*

  validateMinLength - Valida longitud mínima de un campo

*/
export const validateMinLength = (fieldName, minLength) => {
  return (req, res, next) => {
    const value = req.body[fieldName];

    if (!value) {
      const error = new ValidationError(`${fieldName} is required`);
      return next(error);
    }

    if (value.toString().length < minLength) {
      const error = new ValidationError(
        `${fieldName} must be at least ${minLength} characters long`
      );
      return next(error);
    }

    next();
  };
};

/*

  validateMongoId - Valida que un ID sea MongoDB ObjectId válido

*/
export const validateMongoId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id) {
      const error = new ValidationError(`${paramName} is required`);
      return next(error);
    }

    // Validar que sea MongoDB ObjectId (24 caracteres hexadecimales)
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!mongoIdRegex.test(id)) {
      const error = new ValidationError(`Invalid ${paramName} format`);
      return next(error);
    }

    next();
  };
};

/*

  validateEnum - Valida que un campo tenga un valor de un conjunto permitido

*/
export const validateEnum = (fieldName, allowedValues) => {
  return (req, res, next) => {
    const value = req.body[fieldName];

    if (!value) {
      const error = new ValidationError(`${fieldName} is required`);
      return next(error);
    }

    if (!allowedValues.includes(value)) {
      const error = new ValidationError(
        `${fieldName} must be one of: ${allowedValues.join(', ')}`
      );
      return next(error);
    }

    next();
  };
};

/*

  validateNumber - Valida que un campo sea un número

*/
export const validateNumber = (fieldName) => {
  return (req, res, next) => {
    const value = req.body[fieldName];

    if (value === undefined || value === null || value === '') {
      const error = new ValidationError(`${fieldName} is required`);
      return next(error);
    }

    if (isNaN(value)) {
      const error = new ValidationError(`${fieldName} must be a number`);
      return next(error);
    }

    next();
  };
};

export default {
  validateRequiredFields,
  validateEmail,
  validateMinLength,
  validateMongoId,
  validateEnum,
  validateNumber,
};
