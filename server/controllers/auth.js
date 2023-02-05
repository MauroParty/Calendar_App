const bcryptjs = require('bcryptjs');
const generateJWT = require('../../../References Projects/MERN Calendar/server/helpers/jwt');
const User = require('../models/User');

// Create an User Account
const createUser = async (req,res) => {
  const { email,password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(user) {
      return res
        .status(400)
        .json({ ok: false, msg: 'Email is already in use.'});
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    await user.save();

    const token = await generateJWT(user.id, user.name);

    return res
      .status(201)
      .json({
        ok: true,
        user,
        token,
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

// Logging with an User Account
const loginUser = async (req,res) => {
  const { email,password } = req.body;

  try {
    const user = await User.findOne({ username });

    if(!user) {
      return res
        .status(400)
        .json({
          ok: false,
          msg: 'Username does not exist.'
        });
      }

      // Verify if password matching
      const validPassword = bcryptjs.compareSync(password,user.password);
      
      if(!validPassword) {
        return res
          .status(401)
          .json({
            ok: false,
            msg: 'Invalid password.'
          });
      }

      const token = await generateJWT(user.id,user.name);

      return res
        .status(200)
        .json({
          ok: true,
          user,
          token
        });

  } catch(err) {
    console.log(err);
    return res
    .status(500)
    .json({
      ok: false,
      msg: 'Please, contact the administrator.'
    });
  }
}

const renewToken = async (req,res) => {
  const { id,name } = req;
  const token = await generateJWT(id,name);
  res.json({
    ok: true,
    user: {
      _id: id,
      name
    },
    token
  });
}

module.exports = { createUser, loginUser, renewToken };