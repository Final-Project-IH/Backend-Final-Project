const User = require("../models/User.model");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const Favorite = require("../models/Favorite.model.js");

module.exports.create = (req, res, next) => {
  const { email, password, username, bio } = req.body;
  User.create({ email, password, username, bio })
    .then((userCreated) => {
      res.status(StatusCodes.CREATED).json({});
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .populate({
      path: "favorites",
      populate: [
        {
          path: "auction",
          populate: {
            path: "product",
          },
        },
      ],
    })

    .then((user) => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  console.log(req.files)
  const data = {username: req.body.username, bio: req.body.bio}
  if(req.files){
    data.image = req.files[0].path
  }
  const { username, bio } = req.body
	User.findByIdAndUpdate(req.currentUserId, data , { new: true, runValidators: true })
		.then((updated) => res.status(200).send(updated))
		.catch(next)
};

module.exports.getMyFavs = (req, res, next) => {
  Favorite.find({ user: req.currentUserId })
  .populate({ path: 'auction', populate: 'product' })
    .then((favorites) => {
      res.json(favorites);
    })
    .catch(next);
};
