import { Router } from "express";
import { TeacherRegister } from "../controllers/teacherAuthController.js";
import { validateTeacher } from "../validation/teacherValidation.js";

const authRouter = Router();

authRouter.route("/register").post(validateTeacher, TeacherRegister);

export default authRouter;
