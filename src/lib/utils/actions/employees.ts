"use server";

import { Employee, PrismaClient, Shift } from "prisma/generated/prisma";

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

export const getShifts = async (): Promise<{
  shifts: Shift[];
  error: string;
}> => {
  const returnValues: {
    shifts: Shift[];
    error: string;
  } = {
    shifts: [],
    error: "",
  };

  try {
    const shifts = await prisma.shift.findMany();
    returnValues.shifts = shifts;
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
