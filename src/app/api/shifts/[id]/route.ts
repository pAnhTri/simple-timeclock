import { PrismaClient, Shift } from "prisma/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<Shift | { message: string }>> => {
  const prisma = new PrismaClient();

  try {
    const { id } = await params;

    const {
      clockInTime,
      firstBreakStartTime,
      firstBreakEndTime,
      lunchStartTime,
      lunchEndTime,
      secondBreakStartTime,
      secondBreakEndTime,
      clockOutTime,
    } = await req.json();

    if (
      !clockInTime &&
      !firstBreakStartTime &&
      !firstBreakEndTime &&
      !lunchStartTime &&
      !lunchEndTime &&
      !secondBreakStartTime &&
      !secondBreakEndTime &&
      !clockOutTime
    ) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }

    const shift = await prisma.shift.findUnique({
      where: {
        id: id,
      },
    });

    if (!shift) {
      return NextResponse.json({ message: "Shift not found" }, { status: 404 });
    }

    const updatedShift = await prisma.shift.update({
      where: {
        id: id,
      },
      data: {
        clockInTime: clockInTime ?? undefined,
        firstBreakStartTime: firstBreakStartTime ?? undefined,
        firstBreakEndTime: firstBreakEndTime ?? undefined,
        lunchStartTime: lunchStartTime ?? undefined,
        lunchEndTime: lunchEndTime ?? undefined,
        secondBreakStartTime: secondBreakStartTime ?? undefined,
        secondBreakEndTime: secondBreakEndTime ?? undefined,
        clockOutTime: clockOutTime ?? undefined,
      },
    });

    return NextResponse.json(updatedShift);
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
