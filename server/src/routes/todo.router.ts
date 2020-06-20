import { Router } from "express";
import Todo from "../models/todo.model";

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

export default router;
