import mongoose from "mongoose";
import { startOfToday } from "date-fns";

export interface Stamp extends mongoose.Document {
  clockIn: Date;
  clockOut: Date;
}

export interface TimeLog extends mongoose.Document {
  employeeId: mongoose.Types.ObjectId;
  shift: Date;
  stamps: Stamp[];
}

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

export default mongoose.models.TimeLog ||
  mongoose.model("TimeLog", TimeLogSchema);
