import { Router } from "express";
import { TeacherRegister } from "../controllers/teacherAuthController.js";
import { validateTeacher } from "../validation/teacherValidation.js";
import upload from "../middlewares/multer.middleware.js";

const authRouter = Router();

authRouter
  .route("/register")
  .post(upload.single("profilePicture"), validateTeacher, TeacherRegister);

export default authRouter;
