import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req: NextRequest) => {
  try {
    const { individual, file } = await req.json();

    if (!individual || !file) {
      return NextResponse.json(
        {
          success: false,
          message: "Individual and file are required",
        },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `http://localhost:5000/openfile/${encodeURIComponent(individual)}`,
      {
        fileName: file,
      }
    );

    return NextResponse.json({
      success: true,
      response: response.data,
    });
  } catch (error) {
    console.error(error);

    let message = "Error opening file";

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
