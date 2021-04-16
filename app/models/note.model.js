const mongoose = require("mongoose");

module.exports.notesSchema = new mongoose.Schema(
  { 
    writer: Number,
    title: {
      type: String,
      required: true,
      minLength: 1,
      maxLengh: 80
    },
    sub: {
      type: String,
      minLength: 1,
      maxLengh: 80
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLengh: 200
    },
    category: {
      type: String,
      minLength: 1,
      maxLengh: 20
    }
  },
  { timestamps: true }
);

module.exports.noteModel =  mongoose.model("notes", this.notesSchema);
