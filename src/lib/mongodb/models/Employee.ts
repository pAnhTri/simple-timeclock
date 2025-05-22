import mongoose from "mongoose";

export interface Employee extends mongoose.Document {
  name: string;
  isClockedIn: boolean;
}

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isClockedIn: { type: Boolean, default: false },
});

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
