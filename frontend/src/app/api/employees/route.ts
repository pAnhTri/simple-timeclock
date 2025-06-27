import dbConnect from "@/lib/mongoDB/dbConnect";
import Employee, {
  Employee as EmployeeType,
} from "@/lib/mongoDB/model/Employee";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Get all employees
    const employees: EmployeeType[] = await Employee.find();

    return NextResponse.json(employees);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
};
