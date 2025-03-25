import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Teacher from "../models/teacher.auth.model.js";
import cloudinaryUpload from "../utils/Cloudinary.js";
import fs from "fs";
import sendEmail from "../utils/sendEmail.js";

const generateAccessAndRefereshTokens = async (teacherId) => {
  try {
    const teacher = await Teacher.findById(teacherId);
    const accessToken = teacher.generateAccessToken();
    const refreshToken = teacher.generateRefreshToken();

    teacher.refreshToken = refreshToken;
    await teacher.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return new ApiError(
      500,
      "Something while wrong when generating refresh and access token"
    );
  }
};

const RegisterTeacher = asyncHandler(async (req, res, next) => {
  const {
    username,
    fullName,
    email,
    password,
    phone,
    teachingMode,
    subjectsTaught,
    classesTaught,
    experience,
    language,
    biography,
  } = req.body;

  // Validate required fields
  if (
    [username, fullName, email, password, phone, experience].some(
      (field) => typeof field === "string" && field.trim() === ""
    ) ||
    !Array.isArray(teachingMode) ||
    teachingMode.length === 0 ||
    !Array.isArray(subjectsTaught) ||
    subjectsTaught.length === 0 ||
    !Array.isArray(classesTaught) ||
    classesTaught.length === 0 ||
    !Array.isArray(language) ||
    language.length === 0
  ) {
    return next(new ApiError(400, "All fields are required"));
  }

  // Check if the teacher already exists
  const existedTeacher = await Teacher.findOne({
    $or: [{ username }, { email }],
  });

  if (existedTeacher) {
    return next(new ApiError(401, "Username or email already in use"));
  }

  const localfilepath = req.file?.path.replace(/\\/g, "/");

  const result = await cloudinaryUpload(localfilepath);

  if (!result) {
    return next(new ApiError(500, "upload failed"));
  }

  // ✅ Delete local file after successful Cloudinary upload
  fs.unlink(localfilepath, (err) => {
    if (err) console.error("Error deleting file:", err);
  });

  // Create new teacher
  const teacher = await Teacher.create({
    username,
    fullName,
    email,
    password,
    phone,
    teachingMode,
    subjectsTaught,
    classesTaught,
    experience,
    language,
    biography,
    profilePicture: result.secure_url,
  });

  // ✅ Send email notification to admin
  const adminEmail = process.env.ADMIN_EMAIL;
  const emailSubject = "New Teacher Registration Pending Approval";
  const emailText = `A new teacher (${fullName}, ${email}) has registered. Please review and approve their profile This is the full details of admin ${teacher}.`;

  await sendEmail(adminEmail, emailSubject, emailText);

  // Fetch created teacher without password & refreshToken
  const createdTeacher = await Teacher.findById(teacher._id).select(
    "-password -refreshToken"
  );

  if (!createdTeacher) {
    return next(
      new ApiError(400, "Something went wrong while registering the user")
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Teacher registered successfully! Awaiting admin approval.",
        createdTeacher
      )
    );
});

const LoginTeacher = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const teacher = await Teacher.findOne({
    $or: [{ username }, { email }],
  });

  if (!teacher) {
    return next(new ApiError(401, "Teacher does not exist"));
  }

  // if (teacher.isApproved !== false || teacher.status !== "Approved") {
  //   return next(new ApiError(401, "Your account is not approved yet"));
  // }

  const isPasswordValid = await teacher.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return next(new ApiError(401, "Password Incorrect"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    teacher._id
  );

  const loggedInTeacher = await Teacher.findById(teacher._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)

    .json(
      new ApiResponse(
        200,
        {
          teacher: loggedInTeacher,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );
});

const LogoutTeacher = asyncHandler(async (req, res, next) => {
  Teacher.findByIdAndUpdate(
    req.teacher._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

export { RegisterTeacher, LoginTeacher, LogoutTeacher };
