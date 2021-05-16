import { body, param, validationResult } from 'express-validator';
import { db } from '../models/mongoose.js';
const User = db.users;
const Note = db.notes;

const register = [
  body('username')
    .custom(value => {
      return User.findOne({username: value}).then(user => {
        if (user) {
          return Promise.reject('username already taken');
        }
      });
    })
    .exists().withMessage('username is required')
    .isLength({max: 20}).withMessage('username cannot exceed 20 characters'),
  body('email')
    .exists().withMessage('email is required')
    .isEmail().withMessage('email should be a valid email'),
  body('password')
    .exists().withMessage('password is required')
    .isLength({min: 8}).withMessage('password should be at least 8 caracteres long'),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  })
];

const login = [
  body('username')
    .custom(value => {
      return User.findOne({username: value}).then(user => {
        if (!user) {
          return Promise.reject('cant find username under this name');
        }
      });
    })
    .exists().withMessage('username is required')
    .isLength({max: 20}).withMessage('username cannot exceed 20 characters'),
  body('password')
    .exists().withMessage('password is required')
    .isLength({min: 8}).withMessage('password should be at least 8 caracteres long')
];

const newNote = [
  body('title')
    .exists().withMessage('title is required')
    .isLength({max: 60}).withMessage('title cannot exceed 60 characters'),
  body('sub')
    .exists().withMessage('sub is required')
    .isLength({max: 60}).withMessage('sub cannot exceed 60 characters'),
  body('content')
    .exists().withMessage('content is required')
    .isLength({max: 300}).withMessage('content cannot exceed 300 characters'),
  body('category')
    .exists().withMessage('category is required')
    .isLength({max: 25}).withMessage('category cannot exceed 25 characters')
];

const validate = (schemas)  => {
  return async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    const errors = result.array();
    return  res.send(errors)
  };
}

export { validate, register, login, newNote };