import { z } from "zod";

// Define strong password regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Define phone number regex
const phoneRegex = /^[0-9]{10,15}$/;

// Define Zod schema
const teacherSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores"
    ),

  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'’-]+$/,
      "Full name should contain only letters, spaces, apostrophes, or hyphens"
    ),

  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password should not exceed 50 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  phone: z
    .string()
    .regex(
      phoneRegex,
      "Phone number must be between 10-15 digits and contain only numbers"
    ),

  teachingMode: z
    .array(z.enum(["Online", "Offline", "Hybrid"]))
    .min(1, "At least one teaching mode is required"),

  subjectsTaught: z
    .array(z.string().min(2, "Subject name must be at least 2 characters"))
    .min(1, "At least one subject is required"),

  classesTaught: z
    .array(z.string().min(1, "Class name cannot be empty"))
    .min(1, "At least one class is required"),

  experience: z
    .string()
    .min(1, "Experience must be at least 1 year")
    .max(50, "Experience cannot exceed 50 years"),

  language: z
    .array(z.string().min(2, "Language name must be at least 2 characters"))
    .min(1, "At least one language is required"),

  biography: z
    .string()
    .min(10, "Biography must be at least 10 characters long")
    .max(500, "Biography cannot exceed 500 characters")
    .optional(),

  isApproved: z.boolean().default(false),

  status: z.enum(["Pending", "Approved", "Rejected"]).default("Pending"),
});

// **Middleware function for validation**
export const validateTeacher = (req, res, next) => {
  try {
    req.body = teacherSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
