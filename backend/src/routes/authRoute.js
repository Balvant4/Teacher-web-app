import { Router } from "express";
import { teacherValidation } from "../validation/teacherValidation.js";
import { TeacherRegister } from "../controllers/teacherAuthController.js";

const authRouter = Router();

authRouter.route("/teacher-register").post(teacherValidation, TeacherRegister);

export default authRouter;
