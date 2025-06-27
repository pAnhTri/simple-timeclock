import mongoose from "mongoose";
import { startOfToday } from "date-fns";

const StampSchema = new mongoose.Schema({
  clockIn: { type: Date, default: null },
  clockOut: { type: Date, default: null },
});

const TimeLogSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  shift: { type: Date, default: startOfToday() },
  stamps: [StampSchema],
});

export type TimeLog = mongoose.HydratedDocumentFromSchema<typeof TimeLogSchema>;

export type Stamp = mongoose.HydratedDocumentFromSchema<typeof StampSchema>;

export default mongoose.models.TimeLog ||
  mongoose.model("TimeLog", TimeLogSchema);
