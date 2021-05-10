const mongoose = require('mongoose');

module.exports.notesSchema = new mongoose.Schema(
  { 
    writer: Number,
    title: {
      type: String,
      required: true,
      minLength: 1,
      maxLengh: 60
    },
    sub: {
      type: String,
      minLength: 1,
      maxLengh: 60
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLengh: 300
    },
    category: {
      type: String,
      required: true,
      minLength: 1,
      maxLengh: 25
    }
  },
  { timestamps: true }
);

module.exports.noteModel =  mongoose.model('notes', this.notesSchema);
