const { Router } = require('express');
const { check } = require('express-validator');

const { createUser,loginUser,renewToken } = require('../controllers/auth');
const { emailExists } = require('../helpers/databaseValidators');
const validateFields = require('../middlewares/validateFields');
const validateJWT = require('../middlewares/validateJWT');

const router = router();

const errorMsgs = {
  name: [
    'Name is required.',
    'Name length must be max 32 characters.'
  ],
  email: [
    'Invalid email.'
  ],
  password: [
    'Password should be between 8-32 characters and should include 1 number, 1 symbol, 1 lowercase and 1 uppercase.'
  ]
}

router.post(
  '/register',
  [
    check(
      'name',
      errorMsgs.name[0]
    ).not().isEmpty(),

    check(
      'name',
      errorMsgs.name[1]
    ).isLength({ max:32}),

    check(
      'email',
      errorMsgs.email[0]
    ).isEmail(),

    check(
      'password',
      errorMsgs.password[0]
    ).isLength({ min: 8, max: 32}),
  ]
);

router.get(
  '/renew',
  validateJWT,
  renewToken
);

module.exports = router;