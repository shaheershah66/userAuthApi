import express from "express";
import 'dotenv/config';
import { userRouter } from "./routes/user.js";
import dbConnection from "./db/index.js";

const app = express();
app.use(express.json());
app.use("/users", userRouter);

// db connection
dbConnection();

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running at port", process.env.PORT || 5000);
});
