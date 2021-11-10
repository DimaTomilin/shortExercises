const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema(
  {
    license_id: {
      type: Number,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Agent', agentSchema);
