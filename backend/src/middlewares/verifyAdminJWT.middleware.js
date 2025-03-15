import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Admin from "../models/admin.auth.model.js";

export const verifyAdminJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      return next(new ApiError(401, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ADMIN_ACCESS_TOKEN_SECRET
    );

    const admin = await Admin.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!admin) {
      //TODO
      return next(new ApiError(401, "Invalid Access Token"));
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid access token"));
  }
});
