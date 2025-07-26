import { z } from "zod";
import { shiftValidator } from "./shift";

const employeeName = z
  .string()
  .min(1, { message: "Name is required" })
  .regex(/^[\p{L} '-.]{1,100}$/u, {
    message: "Name must contain only letters, spaces, hyphens, and periods",
  });

const employeeEmail = z.email({ message: "Invalid email address" });

const employeePassword = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(30, { message: "Password must be less than 30 characters" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }
  );

export const employeeNameEditValidator = z.object({
  name: employeeName,
});

export const employeeCreationValidator = z.object({
  name: employeeName,
  email: employeeEmail,
  password: employeePassword,
});

export const employeeValidator = z.object({
  name: employeeName,
  isClockedIn: z.boolean().optional(),
  isOnFirstBreak: z.boolean().optional(),
  isOnLunchBreak: z.boolean().optional(),
  isOnSecondBreak: z.boolean().optional(),
  email: employeeEmail,
  password: employeePassword,
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export type EmployeeNameEditInput = z.infer<typeof employeeNameEditValidator>;
export type EmployeeCreationInput = z.infer<typeof employeeCreationValidator>;
export type EmployeeInput = z.infer<typeof employeeValidator>;
