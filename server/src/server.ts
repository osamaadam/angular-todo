import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.router";
import auth from "./middleware/auth.middleware";
import todoRouter from "./routes/todo.router";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(auth());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database connection established successfully!");
});

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
