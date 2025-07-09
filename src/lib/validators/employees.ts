import { z } from "zod";

const employeeName = z
  .string()
  .min(1, { message: "Name is required" })
  .regex(/^[\p{L} '-.]{1,100}$/u, {
    message: "Name must contain only letters, spaces, hyphens, and periods",
  });

export const employeeNameEditValidator = z.object({
  name: employeeName,
});

export type EmployeeNameEditInput = z.infer<typeof employeeNameEditValidator>;
