const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema(
  {
    charity_name: {
      type: String,
      required: [true, "Charity name is required"],
    },
    charity_address: {
      type: String,
      required: [true, "Charity address is required"],
    },
    charity_phone: {
      type: String,
      required: [true, "Charity phone is required"],
    },
    charity_medican: {
      type: [String],
      required: [true, "Charity medicin is required"],
      
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Charity", charitySchema);
