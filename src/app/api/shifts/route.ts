import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "prisma/generated/prisma";

export const POST = async (req: NextRequest) => {
  const prisma = new PrismaClient();

  try {
    const { date, employeeId } = await req.json();

    if (!date || !employeeId) {
      return NextResponse.json(
        { message: "Date and employee ID are required" },
        { status: 400 }
      );
    }

    const shift = await prisma.shift.create({
      data: {
        date,
        employeeId,
        clockInTime: new Date(),
      },
    });

    return NextResponse.json(shift);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
