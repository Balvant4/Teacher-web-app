import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const teacherSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    teachingMode: {
      type: [String],
      required: true,
    },
    subjectsTaught: {
      type: [String],
      required: true,
    },
    classesTaught: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    language: {
      type: [String],
      required: true,
    },
    profilePicture: {
      type: String, // Cloudinary URL
    },
    biography: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video", // Fixed 'reg' to 'ref'
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware to hash password before saving
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if password is correct
teacherSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token
teacherSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" } // Added default expiry
  );
};

// Method to generate refresh token
teacherSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" } // Added default expiry
  );
};

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
