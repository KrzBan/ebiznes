const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../../config');
const {User} = require('../models/index');

module.exports.signUp = async (res, parameters) => {
  const {
    password,
    passwordConfirmation,
    email,
    username,
    name,
  } = parameters;

  if (password === passwordConfirmation) {
    const newUser = User.build({
      password: Bcrypt.hashSync(password, 10),
      email: email,
      username: username,
      name: name,
    });

    try {
      const savedUser = await newUser.save();

      const token = jwt.sign(
        { email, id: savedUser.id, username },
        config.API_KEY_JWT,
        { expiresIn: config.TOKEN_EXPIRES_IN }
      );

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.errors[0].message,
      });
    }
  }

  return res.status(400).json({
    status: 400,
    message: 'Passwords are different, try again',
  });
};

module.exports.login = async (res, parameters) => {
  const {
    username,
    password
  } = parameters;

  const user = await User.findOne({
    where: {
      username: username
    }
  });

  if(user === null){
    return res.status(400).json({
      status: 400,
      message: 'Username does not exist',
    });
  }

  const match = await Bcrypt.compare(password, user.password);

  if(match === false){
    return res.status(400).json({
      status: 400,
      message: 'Invalid password',
    });
  }

  try {
    const token = jwt.sign(
      { emaiL: user.email, id: user.id, username: user.username },
      config.API_KEY_JWT,
      { expiresIn: config.TOKEN_EXPIRES_IN }
    );
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
    });
  }
  
};

