import dbConnect from "@/lib/mongoDB/dbConnect";
import Employee from "@/lib/mongoDB/model/Employee";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) => {
  try {
    await dbConnect();

    // Get the employee
    const { _id } = await params;
    const employee = await Employee.findById(_id);
    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(employee);
  } catch (error) {
    console.error(`API Error: ${error}`);
    return NextResponse.json(
      { error: "Failed to fetch employee" },
      { status: 500 }
    );
  }
};
