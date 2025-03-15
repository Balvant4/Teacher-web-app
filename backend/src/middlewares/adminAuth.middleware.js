import jwt from "jsonwebtoken";
import Admin from "../models/admin.auth.model.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access Denied: No Token Provided" });
    }

    // Verify token using the correct secret
    const decoded = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    const admin = await Admin.findById(decoded._id);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins Only" });
    }

    req.admin = admin; // Attach admin details to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
