const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  REQUIRED_FIELD,
  INVALID_EMAIL,
  INVALID_LENGTH,
} = require("../config/errorMessages");

const ROUNDS = 10;

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: [5, INVALID_LENGTH],
      maxlength: [10, INVALID_LENGTH],
      required: [true, REQUIRED_FIELD],
      unique: true,
      lowercase: true,
    },
    bio: {
      type: String,
      minlength: [5, INVALID_LENGTH],
      maxlength: [50, INVALID_LENGTH],
    },
    email: {
      type: String,
      required: [true, REQUIRED_FIELD],
      match: [EMAIL_PATTERN, INVALID_EMAIL],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [8, INVALID_LENGTH],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

UserSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

UserSchema.virtual("bids", {
  ref: "Bid",
  foreignField: "bidder",
  localField: "_id",
  justOne: false,
});

UserSchema.virtual("favorites", {
  ref: "Favorite",
  foreignField: "user",
  localField: "_id",
  justOne: false,
});

UserSchema.virtual("products", {
  ref: "Product",
  foreignField: "owner",
  localField: "_id",
  justOne: true,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
