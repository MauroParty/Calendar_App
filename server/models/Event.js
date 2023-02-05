const { Schema, model} = require('mongoose');

const EventSchema = Schema({
  title: {
    type: String,
    required: [true,'Title is Required']
  },
  startEvent: {
    type: Date,
    required: [true,'Event start is required']
  },
  endEvent: {
    type: Date,
    required: [true,'Event start is required']
  },
  notes: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
});

EventSchema.methods.toJSON = function () {
  const { __v, ...event } = this.toObject();
  return event;
}

module.exports = model('Event', EventSchema);