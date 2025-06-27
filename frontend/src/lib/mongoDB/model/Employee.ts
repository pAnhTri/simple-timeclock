import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isClockedIn: {
    type: Boolean,
    default: false,
  },
});

export type Employee = mongoose.HydratedDocumentFromSchema<
  typeof EmployeeSchema
>;

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
