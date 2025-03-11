import { Router } from "express";
import { TeacherRegister } from "../controllers/teacherAuthController.js";
import { teacherValidation } from "../validation/teacherValidation.js";

const authRouter = Router();

authRouter.route("/register").post(teacherValidation, TeacherRegister);

export default authRouter;
