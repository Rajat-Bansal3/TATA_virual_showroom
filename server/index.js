import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import morgan from "morgan"

configDotenv();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT || 5000, () => console.log(`Server started `));
