import { Router } from "express";
import Todo, { TodoType } from "../models/todo.model";

interface Auth {
  _id: string;
  iat: number;
}

const router = Router();

router.get("/", async (req, res) => {
  const { user } = req.body;
  if (!user)
    res.status(401).json({
      error: "User not logged in!",
    });

  try {
    const todos = await Todo.find({ user: user._id });

    res.json({ todos });
  } catch (error) {
    throw error;
  }
});

router.post("/add", async (req, res) => {
  const { user, msg } = req.body;

  if (!user)
    res.status(401).json({
      error: "User not logged in!",
    });

  if (!msg.trim())
    res.status(400).json({
      error: "The msg field can not be empty!",
    });

  const newTodo = new Todo({
    user: user._id,
    msg,
  });

  const todo = await newTodo.save();

  res.json({ todo });
});

router.put("/", async (req, res) => {
  const { user, todo }: { user: Auth; todo: TodoType } = req.body;

  if (!user) res.status(401).json("User not logged in!");

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todo._id },
    {
      $set: { completed: !todo.completed },
    }
  ).exec();

  res.json({ todo: updatedTodo });
});

router.post("/delete", async (req, res) => {
  const { user, todo }: { user: Auth; todo: TodoType } = req.body;

  if (!user) res.status(401).json("User not logged in!");

  const deletedTodo = await Todo.findOneAndDelete({ _id: todo._id }).exec();

  res.json({ todo: deletedTodo });
});

export default router;
