import { Router } from "express";
import { TeacherRegister } from "../controllers/teacherAuthController.js";
import { teacherValidation } from "../validation/teacherValidation";

const authRouter = Router();

authRouter.route("/teacher-register").post(teacherValidation, TeacherRegister);

export default authRouter;
