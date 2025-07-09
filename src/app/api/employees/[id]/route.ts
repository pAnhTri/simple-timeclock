import { NextRequest, NextResponse } from "next/server";
import { Employee, PrismaClient } from "prisma/generated/prisma";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<Employee | { message: string }>> => {
  const prisma = new PrismaClient();

  try {
    const { id } = await params;

    const body = await req.json();
    const {
      name,
      isClockedIn,
      isOnFirstBreak,
      isOnLunchBreak,
      isOnSecondBreak,
    } = body;

    // Check if any field is actually provided in the request
    const hasUpdates = Object.keys(body).length > 0;

    if (!hasUpdates) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: id,
      },
    });

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: id,
      },
      data: {
        name: name ?? undefined,
        isClockedIn: isClockedIn ?? undefined,
        isOnFirstBreak: isOnFirstBreak ?? undefined,
        isOnLunchBreak: isOnLunchBreak ?? undefined,
        isOnSecondBreak: isOnSecondBreak ?? undefined,
      },
    });

    return NextResponse.json(updatedEmployee);
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<void | { message: string }>> => {
  const prisma = new PrismaClient();

  try {
    const { id } = await params;

    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    await prisma.employee.delete({
      where: { id },
    });

    return NextResponse.json(undefined);
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
