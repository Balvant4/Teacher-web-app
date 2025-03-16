import express from "express";
import authRouter from "./routes/authRoute.js";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import cors from "cors";
import errorHandler from "./utils/GlobalErrorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieparser());

app.use("/api/v1/auth/", authRouter);

// Use Global Error Handler (Always at the end)
app.use(errorHandler);

export default app;
