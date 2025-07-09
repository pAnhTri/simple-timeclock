import { NextResponse, NextRequest } from "next/server";
import { Employee, PrismaClient } from "prisma/generated/prisma";

export const GET = async (): Promise<
  NextResponse<Employee[] | { message: string }>
> => {
  const prisma = new PrismaClient();

  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
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

export const POST = async (
  req: NextRequest
): Promise<NextResponse<Employee | { message: string }>> => {
  const prisma = new PrismaClient();

  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const newEmployee = await prisma.employee.create({
      data: {
        name,
      },
    });
    return NextResponse.json(newEmployee);
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
