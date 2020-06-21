import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.router";
import auth from "./middleware/auth.middleware";
import todoRouter from "./routes/todo.router";
import path from "path";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/user", auth, userRouter);
app.use("/api/todo", auth, todoRouter);

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
