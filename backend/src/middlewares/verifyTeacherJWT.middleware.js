import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Teacher from "../models/teacher.auth.model.js";

export const verifyTeacherJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      return next(new ApiError(401, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const teacher = await Teacher.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!teacher) {
      //TODO
      return next(new ApiError(401, "Invalid Access Token"));
    }

    req.teacher = teacher;
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid access token"));
  }
});
