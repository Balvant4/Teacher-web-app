import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      default: "admin",
    },
    isApproved: {
      type: Boolean,
      default: true,
    }, // Admin is always approved by default
  },
  { timestamps: true }
);

// Middleware to hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if password is correct
adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token
adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY || "1h" } // Added default expiry
  );
};

// Method to generate refresh token
adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.ADMIN_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXPIRY || "7d" } // Added default expiry
  );
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
