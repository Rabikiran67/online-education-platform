const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    completedMaterials: [{ type: String }], // List of completed material IDs
  },
  { timestamps: true }
);

module.exports = mongoose.model('Progress', ProgressSchema);
