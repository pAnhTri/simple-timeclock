import { endOfDay, startOfDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Shift } from "prisma/generated/prisma";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string; date: string }> }
): Promise<NextResponse<Shift | null | { message: string }>> => {
  const prisma = new PrismaClient();

  try {
    const { id, date } = await params;

    const shift = await prisma.shift.findFirst({
      where: {
        employeeId: id,
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
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
