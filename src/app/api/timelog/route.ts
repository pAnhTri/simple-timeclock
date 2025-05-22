import dbConnect from "@/lib/mongodb/dbConnect";
import TimeLog from "@/lib/mongodb/models/TimeLog";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    const timeLogs = await TimeLog.find();

    return NextResponse.json(
      {
        success: true,
        timeLogs,
      },
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
