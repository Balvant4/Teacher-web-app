import Admin from "../models/admin.auth.model.js";
import dotenv from "dotenv";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

dotenv.config();

const generateAccessAndRefereshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = await admin.generateAccessToken();
    const refreshToken = await admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something while wrong when generating refresh and access token"
    );
  }
};

const createAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (
    [username, email, password].some(
      (field) => typeof field === "string" && field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  if (existingAdmin) {
    throw new ApiError(400, "Admin already exists");
  }

  // Create new admin
  const newAdmin = await Admin.create({ username, email, password });

  // Remove sensitive fields before sending response
  const responseAdmin = newAdmin.toObject();
  delete responseAdmin.password;
  delete responseAdmin.refreshToken;

  return res
    .status(201)
    .json(new ApiResponse(201, "Admin created successfully", responseAdmin));
});

const AdminLogin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // ✅ Check if admin exists using username or email
  const admin = await Admin.findOne({ $or: [{ username }, { email }] });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // ✅ Ensure the user has an 'admin' role
  if (admin.role !== "admin") {
    throw new ApiError(403, "Unauthorized access - Not an admin");
  }

  // ✅ Validate password
  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid Password");
  }

  // ✅ Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    admin._id
  );

  // ✅ Get admin details excluding sensitive fields
  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  // ✅ Secure cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  // ✅ Send response with cookies & admin details
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          admin: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "Admin logged in successfully"
      )
    );
});

const AdminLogout = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  // Clear cookies regardless of token validity
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged out"));
});

export { createAdmin, AdminLogin, AdminLogout };
