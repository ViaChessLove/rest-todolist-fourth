import mongoose from 'mongoose';

const Todo = new mongoose.Schema({
  completed: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Todo', Todo);
