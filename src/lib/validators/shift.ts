import { z } from "zod";

export const shiftValidator = z.object({
  employeeId: z.string(),
  date: z.date(),
  clockInTime: z.date().optional(),
  firstBreakStartTime: z.date().optional(),
  firstBreakEndTime: z.date().optional(),
  lunchStartTime: z.date().optional(),
  lunchEndTime: z.date().optional(),
  secondBreakStartTime: z.date().optional(),
  secondBreakEndTime: z.date().optional(),
  clockOutTime: z.date().optional(),
});

export type ShiftInput = z.infer<typeof shiftValidator>;
