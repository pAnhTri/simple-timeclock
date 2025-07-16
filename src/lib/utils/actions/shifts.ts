"use server";

import { PrismaClient, Shift } from "prisma/generated/prisma";

const prisma = new PrismaClient();

export const getEmployeeShiftsByDateRange = async (
  employeeId: string,
  startDate: Date,
  endDate: Date
): Promise<{
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
    const shifts = await prisma.shift.findMany({
      where: {
        employeeId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: "asc",
      },
    });
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
