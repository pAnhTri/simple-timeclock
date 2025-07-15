import { employeeCreationValidator } from "@/lib/validators/employees";
import { NextResponse, NextRequest } from "next/server";
import { Employee, PrismaClient } from "prisma/generated/prisma";
import { genSaltSync, hashSync } from "bcrypt-ts";

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
    const payload = await req.json();

    const validated = employeeCreationValidator.safeParse(payload);
    if (!validated.success) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(validated.data.password, salt);

    const newEmployee = await prisma.employee.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        password: hashedPassword,
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
