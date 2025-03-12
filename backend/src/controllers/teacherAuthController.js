import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Teacher from "../models/teacher.auth.model.js";

const TeacherRegister = asyncHandler(async (req, res, next) => {
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
    [username, fullName, email, password, phone].some(
      (field) => typeof field === "string" && field.trim() === ""
    ) ||
    experience === undefined ||
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
  });

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
      new ApiResponse(201, "Teacher registered successfully", createdTeacher)
    );
});

export { TeacherRegister };
