import express from 'express'
import authController from '../controllers/auth.js'
import User from '../models/user.js'
import  check from 'express-validator/check'

const router = express.Router();

router.put(
  '/signup',
  [
    check.body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
      check.body('password')
      .trim()
      .isLength({ min: 5 }),
      check.body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post('/login', authController.login);

export default class {}
module.exports = router;
