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

  const admin = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    admin._id
  );

  const loggedInAdmin = await Admin.findById(admin._id).select(
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
          admin: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "Teacher logged In successfully"
      )
    );

  //
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

// export const createAdmin = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin)
//       return res.status(400).json({ message: "Admin already exists" });

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new admin
//     const newAdmin = new Admin({
//       username,
//       email,
//       password: hashedPassword,
//       role: "admin",
//     });
//     await newAdmin.save();

//     res.json({ message: "✅ New Admin Created Successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "❌ Server Error", error });
//   }
// };

// export const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if admin exists
//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     // Check password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     if (!token) {
//       return res.status(400).json({ message: "Token error" });
//     }

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };
