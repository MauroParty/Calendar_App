const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true,'Name is required.'],
  },
  surname: {
    type: String,
    required: [true,'Surname is required.']
  },
  nickname:{
    type: String,
    required: [true,'Nickname is required.']
  },
  email: {
    type: String,
    required: [true,'Email is required.'],
    lowercase: true,
    unique: true
  },
  password: {
    type: string,
    required: [true,'Password is required.']
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = model("User", UserSchema);