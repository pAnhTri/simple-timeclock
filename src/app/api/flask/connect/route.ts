import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async () => {
  try {
    const response = await axios.get("http://localhost:5000/");

    return NextResponse.json({
      success: true,
      response: response.data,
    });
  } catch (error) {
    console.error(error);

    let message = "Flask connection error";

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
