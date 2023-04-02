const User = require('../models/User.model');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

module.exports.create = (req, res, next) => {
  const { email, password, username, bio } = req.body;
  User.create({ email, password, username, bio })
    .then(userCreated => {
      res.status(StatusCodes.CREATED).json(userCreated);
    })
    .catch(next)
}

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next)
}

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}


module.exports.editProfile = (req, res, next) => {
  // if (req.file) {
  //   req.body.image = req.file.path;
  // } HAY QUE METERLE IMAGEN PERO AUN NO TENEMOS CLOUDINARY
  const { username, bio } = req.body;
  console.log('username', username)
  console.log("bio", bio)
  User.findByIdAndUpdate(req.currentUserId, {username, bio}, {image: req.body})
  .then((userUpdated)=> {
    res.status(StatusCodes.OK).json(userUpdated)
  })
  .catch((err) => next(err))
}



