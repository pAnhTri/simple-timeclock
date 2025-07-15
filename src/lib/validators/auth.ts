import z from "zod";

const email = z.email({ message: "Invalid email address" });

const password = z
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

export const loginValidator = z.object({
  email,
  password,
});

export type LoginInput = z.infer<typeof loginValidator>;
