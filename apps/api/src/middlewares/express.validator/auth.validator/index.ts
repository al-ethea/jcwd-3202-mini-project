import { body } from 'express-validator';

export const registerUserValidator = [
  body(['firstName', 'lastName', 'postcode', 'email', 'password'])
    .notEmpty()
    .withMessage('All fields are required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('postcode')
    .matches(/^\d{5}$/)
    .withMessage('Postcode must be exactly 5 digits'),
];
