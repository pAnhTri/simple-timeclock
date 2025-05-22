import dbConnect from "@/lib/mongodb/dbConnect";
import Employee from "@/lib/mongodb/models/Employee";
import type {Employee as EmployeeType} from "@/lib/mongodb/models/Employee";
import {NextResponse} from "next/server";

export const GET = async () => {
    try {

        await dbConnect();

        const employees: EmployeeType[] = await Employee.find();

        return NextResponse.json({success: true, employees}, {status: 200});

    } catch (error) {
        console.error(error);

        let message = "Database connection error";

        if (error instanceof Error) {
            message = error.message;
        }

        return NextResponse.json({success: false, error: {
            message,
        }}, {status: 500});

    }
}
