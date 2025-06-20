const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Child Tracking must belong to doctor id .."],
      ref: "Doctor",
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Child Tracking must belong to parent id .."],
      ref: "Parent",
    },

    session_number: {
      type: Number,
      required: [true, "Session Number Required.."],
    },
    session_date: {
      type: String,
      required: [true, "Session Date Required.."],
    },
    statusOfSession: {
      type: String,
      required: [true, "Session Status Required"],
      enum: ["coming", "done", "progress"],
      default: "done",
    },
    comments: [
      {
        type: String,
        required: [true, "Session Comments are required.."],
      },
    ],

    session_review: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        parentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Parent",
        },
        ratings: {
          type: Number,
        },
        title: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//nested populate
sessionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "parentId",
    select: "userName email role",
    populate: {
      path: "childs", // ده الـ virtual field اللي جوه parent
      select: "childName gender -parent",
    },
  });
  next();
});

module.exports = mongoose.model("Session", sessionSchema);
