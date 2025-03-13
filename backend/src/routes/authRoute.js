import { Router } from "express";

import { validateTeacher } from "../validation/teacherValidation.js";
import upload from "../middlewares/multer.middleware.js";
import {
  LoginTeacher,
  LogoutTeacher,
  RegisterTeacher,
} from "../controllers/teacherAuthController.js";
import { verifyTeacherJWT } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter
  .route("/register")
  .post(upload.single("profilePicture"), validateTeacher, RegisterTeacher);
authRouter.route("/login").post(LoginTeacher);

//secured routes
authRouter.route("/logout").post(verifyTeacherJWT, LogoutTeacher);

export default authRouter;
