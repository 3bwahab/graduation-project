const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const parentSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "parent name required.."],
      maxlength: [20, "Too long parent name"],
    },
    email: {
      type: String,
      required: [true, "Parent Email is required.."],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Parent Password is required.."], // typo fixed: `requird` -> `required`
    },
    age: {
      type: Number,
      required: [true, "Parent Age required.."],
    },
    phone: {
      type: String,
      required: [true, "Parent Phone required.."],
    },
    address: {
      type: String,
      required: [true, "Parent Address required."],
    },
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["doctor", "parent", "admin"],
      default: "parent",
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpire: Date,
    passwordResetVerfied: Boolean,
    emailChangedAt: Date,
    emailResetCode: String,
    emailResetExpire: Date,
    emailResetVerfied: Boolean,
    passwordChangedAtForParent: Date,
    passwordChangedAtForDoctor: Date,
    image: String,
    numOfChild: {
      type: Number,
      default: 0,
    },
    session_id: {
      type: String,
      sparse: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // remove `id` if it's null
        if (ret.id === null) {
          delete ret.id;
        }
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Virtuals
parentSchema.virtual("childs", {
  ref: "Child",
  foreignField: "parent",
  localField: "_id",
});

// Pre-save hook
parentSchema.pre("save", async function (next) {
  if (!this.session_id) {
    this.session_id = uuidv4();
  }

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("Parent", parentSchema);
