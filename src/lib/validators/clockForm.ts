import { z } from "zod";
import mongoose from "mongoose";

export const clockFormSchema = z.object({
  employeeId: z
    .string()
    .min(1)
    .refine(
      (id) => {
        return mongoose.Types.ObjectId.isValid(id);
      },
      {
        message: "Invalid employee ID",
      }
    ),
});

export type ClockFormInput = z.infer<typeof clockFormSchema>;
