const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchma = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    pRatings: {
      zero: { type: Number, default: 0 },
      one: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      five: { type: Number, default: 0 },
    },
    oRatings: {
      zero: { type: Number, default: 0 },
      one: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      five: { type: Number, default: 0 },
    },
    details: [
      {
        type: String,
        default: "3 Rooms",
      },
    ],
    comments: [
      {
        gId: { type: String, require: true },
        gName: { type: String, require: true },
        email: { type: String, require: true },
        tp: { type: Number, require: true },
        pRating: { type: Number, default: 0 },
        oRating: { type: Number, default: 0 },
        text: { type: String, require: true },
        replies: [{ user: { type: String }, text: { type: String } }],
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchma);

module.exports = Comment;
