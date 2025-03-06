import express from "express";
import authRouter from "./routes/authRoute";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieparser());
app.use(express.json());
app.use("/api/v1/auth", authRouter);

export default app;
