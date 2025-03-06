import { z } from "zod";

// Define strong password regex (at least 8 characters, one uppercase, one lowercase, one number, and one special character)
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Define phone number regex (only numbers, 10-15 digits)
const phoneRegex = /^[0-9]{10,15}$/;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const teacherSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name should contain only letters and spaces"),

  email: z.string().regex(emailRegex, "Invalid email format"),

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

  Teachingmode: z
    .array(z.enum(["Online", "Offline", "Hybrid"]))
    .min(1, "At least one teaching mode is required"),

  subjectsTaught: z
    .array(z.string().min(2, "Subject name must be at least 2 characters"))
    .min(1, "At least one subject is required"),

  classesTaught: z
    .array(z.string().min(1, "Class name cannot be empty"))
    .min(1, "At least one class is required"),

  experience: z
    .number()
    .min(1, "Experience must be at least 1 year")
    .max(50, "Experience cannot exceed 50 years"),

  language: z
    .array(z.string().min(2, "Language name must be at least 2 characters"))
    .min(1, "At least one language is required"),

  profilePicture: z
    .string()
    .url("Profile picture must be a valid URL")
    .optional(),

  biography: z
    .string()
    .min(10, "Biography must be at least 10 characters long")
    .max(500, "Biography cannot exceed 500 characters")
    .optional(),

  isApproved: z.boolean().default(false),

  status: z.enum(["Pending", "Approved", "Rejected"]).default("Pending"),
});
