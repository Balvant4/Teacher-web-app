import { Router } from "express";

import { validateTeacher } from "../validation/teacherValidation.js";
import upload from "../middlewares/multer.middleware.js";
import {
  LoginTeacher,
  LogoutTeacher,
  RegisterTeacher,
} from "../controllers/teacherAuthController.js";
import {
  AdminLogin,
  AdminLogout,
  createAdmin,
} from "../controllers/adminAuthController.js";
import { verifyAdminJWT } from "../middlewares/verifyAdminJWT.middleware.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";
import { verifyTeacherJWT } from "../middlewares/verifyTeacherJWT.middleware.js";

const authRouter = Router();

authRouter
  .route("/teacher/register")
  .post(upload.single("profilePicture"), validateTeacher, RegisterTeacher);
authRouter.route("/teacher/login").post(LoginTeacher);
authRouter.route("/teacher/logout").post(verifyTeacherJWT, LogoutTeacher);

// ADMIN LOGIN ROUTES

authRouter.route("/create-admin").post(verifyAdmin, createAdmin);
authRouter.route("/admin/login").post(AdminLogin);
authRouter.route("/admin/logout").post(verifyAdminJWT, AdminLogout);

export default authRouter;
