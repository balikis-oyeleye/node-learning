import { z } from "zod";

export const registerUserSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(1, "First name cannot be empty")
      .trim(),
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(1, "Last name cannot be empty")
      .trim(),
    phoneNumber: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Phone number must be at least 10 digits")
      .trim(),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address")
      .trim(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .trim(),
    userType: z.enum(["student", "instructor"]).default("student"),
    classLevel: z.number().min(1).max(12).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.userType === "student" &&
      (data.classLevel === undefined || data.classLevel === null)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Class level is required for students",
        path: ["classLevel"],
      });
    }
  });

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .trim(),
});
