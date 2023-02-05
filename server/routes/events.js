const { Router } = require('express');
const { check } = require('express-validator');

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events');

const { eventExistsById, isEventOwner } = require("../helpers/databaseValidators");
const { isDate, isDateAfter } = require('../helpers/dateValidator');
const validateFields = require('../middlewares/validateFields');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

const errorMsgs = {
  title: [
    'Title is required.',
    'Title length must be 4-48 characters'
  ],
  startEvent: [
    'Start date is required.',
    'Invalid start date.'
  ],
  endEvent: [
    'End date is required.',
    'Invalid end date.',
    'End date must be after start date.'
  ],
  notes: [
    'Notes length must be max 128 characters.'
  ],
  id: [
    'Invalid event ID.'
  ],
  delEvent: [
    'Invalid event ID'
  ]
};

router.use(validateJWT);

router.get(
  '/',
  getEvents
);

router.post(
  '/',
  [
    // Title Verification
    check(
      'title',
      errorMsgs.title[0]
    ).not().isEmpty(),
    check(
      'title',
      errorMsgs.title[1]
    ).isLength({ min: 8, max: 32}),
    // Start Event Verification
    check(
      'startEvent',
      errorMsgs.startEvent[0]
    ).not().isEmpty(),
    check(
      'startEvent',
      errorMsgs.startEvent[1]
    ).custom(isDate),
    // End Event Verification
    check(
      'endEvent',
      errorMsgs.endEvent[0]
    ).not().isEmpty(),
    check(
      'endEvent',
      errorMsgs.endEvent[1]
    ).custom(isDate),
    check(
      'endEvent',
      errorMsgs.endEvent[2]
    ).custom((end, { req }) => isDateAfter(end,req.body.start)),
    // Event Notes Verification
    check(
      'notes',
      errorMsgs.notes[0]
    ).optional().isLength({ max: 128 }),

    validateFields,
  ],
  createEvent
);

router.put(
  '/:id',
  [
    check(
      'id',
      errorMsgs.id[0]
    ).isMongoId(),
    check(
      'title',
      errorMsgs.title[0]
    ).not().isEmpty(),
    check(
      'title',
      errorMsgs.title[1]
    ).isLength({ max: 32, }),
    check(
      'startEvent',
      errorMsgs.startEvent[0]
    ).not().isEmpty(),
    check(
      'startEvent',
      errorMsgs.startEvent[1]
    ).custom(isDate),
    check(
      'endEvent',
      errorMsgs.endEvent[0]
    ).not().isEmpty(),
    check(
      'endEvent',
      errorMsgs.endEvent[1]
    ).custom(isDate),
    check(
      'notes',
      'Notes length must be max 128 characters'
    ).optional().isLength({ max: 128, }),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  updateEvent
)

router.delete(
  '/:id',
  [
    check(
      'id',
      errorMsgs.delEvent[0]
    ).isMongoId(),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  deleteEvent
);

module.exports = router;