import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export interface TodoType extends mongoose.Document {
  msg: string;
  completed: boolean;
  date: Date;
}

const Todo = mongoose.model<TodoType>("todos", TodoSchema);

export default Todo;
