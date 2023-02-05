const Event = require('../models/Event');

const getEvents = async (req,res) => {
  try {
    const events = await Event.find().populate('user','name');

    return res.json({
      ok: true,
      events,
    });
  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .json({
        ok: false,
        msg: 'Please, contact with the administrator.'
      });
  }
};

const createEvent = async (req,res) => {
  const { title,startEvent,endEvent,notes } = req.body;

  const event = new Event({
    title,
    startEvent,
    endEvent,
    notes,
    user: req.id
  });

  try {
    await event.save();

    return res
      .status(201)
      .json({
        ok: true,
        event
      });

  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .json({
        ok: false,
        msg: 'Please, contact with the administrator.'
      });
  }
}

const updateEvent = async (req,res) => {
  const { id } = req.params;
  const { title, startEvent, endEvent, notes } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        startEvent,
        endEvent,
        notes
      },
      { new: true }
    );

    return res
      .json({
        ok: true,
        event
      });

  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .json({
        ok: false,
        msg: 'Please, contact with the administrator.'
      });
  }
};

const deleteEvent = async (req,res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);

    return res.json({
      ok: true,
      event
    });
  } catch(err) {
    console.log(err);
    return res
      .status(500)
      .json({
        ok: false,
        msg: 'Please, contact with the administrator.'
      });
  }
}

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };