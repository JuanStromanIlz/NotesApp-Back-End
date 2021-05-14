import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema(
  { 
    writer: String,
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

const noteModel =  mongoose.model('notes', notesSchema);

export { noteModel };
