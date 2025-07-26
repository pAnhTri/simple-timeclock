"use server";

import { endOfToday, startOfToday } from "date-fns";
import { Employee, PrismaClient, Shift } from "prisma/generated/prisma";
import { prismaActionWrapper } from "./utility";
import { employeeValidator } from "@/lib/validators";

const prisma = new PrismaClient();

export const getEmployees = async (): Promise<{
  employees: Employee[];
  error: string;
}> => {
  const returnValues: {
    employees: Employee[];
    error: string;
  } = {
    employees: [],
    error: "",
  };

  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        name: "asc",
      },
    });
    returnValues.employees = employees;
  } catch (error) {
    if (error instanceof Error) {
      returnValues.error = error.message;
    } else {
      returnValues.error = "An unknown error occurred";
    }
  } finally {
    await prisma.$disconnect();
  }

  return returnValues;
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    return JSON.parse(JSON.stringify(employee));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const getEmployeeShiftToday = async (
  employeeId: string
): Promise<Shift | null> => {
  try {
    const shift = await prisma.shift.findFirst({
      where: {
        employeeId,
        date: {
          gte: startOfToday(),
          lte: endOfToday(),
        },
      },
    });

    return JSON.parse(JSON.stringify(shift));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const updateEmployee = async (
  employeeId: string,
  payload: Partial<Employee>
): Promise<Employee> => {
  return await prismaActionWrapper<Employee>(async () => {
    if (Object.keys(payload).length === 0) {
      throw new Error("No fields to update");
    }

    const sanitizedPayload = employeeValidator.partial().safeParse(payload);

    if (!sanitizedPayload.success) {
      throw new Error(sanitizedPayload.error.message);
    }

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: sanitizedPayload.data,
    });

    return updatedEmployee;
  });
};
