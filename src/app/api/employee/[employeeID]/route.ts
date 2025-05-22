import dbConnect from "@/lib/mongodb/dbConnect";
import Employee from "@/lib/mongodb/models/Employee";
import TimeLog from "@/lib/mongodb/models/TimeLog";
import { startOfToday } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ employeeID: string }>;
  }
) => {
  try {
    const { employeeID } = await params;

    if (!employeeID) {
      return NextResponse.json(
        { success: false, error: { message: "Employee ID is required" } },
        { status: 400 }
      );
    }

    const { isClockedIn } = await req.json();

    await dbConnect();

    // If the employee has not clocked in today yet, create a new time log
    const today = startOfToday();

    let timeLog = await TimeLog.findOne({ shift: today });

    if (!timeLog) {
      timeLog = await TimeLog.create({
        employeeId: employeeID,
        shift: today,
        stamps: [],
      });
    }

    // Clock in the employee if they are not clocked in
    if (!isClockedIn) {
      let stamp = timeLog.stamps[timeLog.stamps.length - 1];

      // Create the first stamp if it doesn't exist
      if (!stamp) {
        stamp = {
          clockIn: null,
          clockOut: null,
        };

        stamp.clockIn = new Date();

        timeLog.stamps.push(stamp);
      } else {
        stamp.clockIn = new Date();
      }

      await timeLog.save();
    } else {
      const stamp = timeLog.stamps[timeLog.stamps.length - 1]; // Get the last stamp
      stamp.clockOut = new Date();

      // After clocking out, prepare the next stamp for clocking in
      const nextStamp = {
        clockIn: null,
        clockOut: null,
      };

      timeLog.stamps.push(nextStamp);

      await timeLog.save();
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeID,
      {
        isClockedIn: !isClockedIn,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return NextResponse.json(
        { success: false, error: { message: "Employee not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, updatedEmployee },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    let message = "Database connection error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message,
        },
      },
      { status: 500 }
    );
  }
};
