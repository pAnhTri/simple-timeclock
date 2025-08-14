"use server";

import { shiftValidator } from "@/lib/validators/shift";
import { PrismaClient, Shift } from "prisma/generated/prisma";
import { getPayPeriodFromExcel, prismaActionWrapper } from "./utility";

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

export const getShiftsByEmployeeIdInPayPeriod = async (
  employeeId: string
): Promise<Shift[]> => {
  return await prismaActionWrapper<Shift[]>(async () => {
    const payPeriod = await getPayPeriodFromExcel();

    const { start_date, end_date } = payPeriod;

    const shifts = await prisma.shift.findMany({
      where: {
        employeeId,
        date: {
          gte: new Date(start_date),
          lte: new Date(end_date),
        },
      },
      orderBy: {
        date: "asc",
      },
    });
    return shifts;
  });
};

export const createShiftByEmployeeId = async (
  employeeId: string
): Promise<Shift> => {
  return await prismaActionWrapper<Shift>(async () => {
    const shift = await prisma.shift.create({
      data: {
        employeeId,
        date: new Date(),
        clockInTime: new Date(),
      },
    });
    return shift;
  });
};

export const updateShiftByEmployeeId = async (
  employeeId: string,
  shiftId: string,
  payload: Partial<Shift>
): Promise<Shift> => {
  return await prismaActionWrapper<Shift>(async () => {
    if (Object.keys(payload).length === 0) {
      throw new Error("No fields to update");
    }

    const sanitizedPayload = shiftValidator.partial().safeParse(payload);

    if (!sanitizedPayload.success) {
      throw new Error(sanitizedPayload.error.message);
    }

    const updatedShift = await prisma.shift.update({
      where: {
        id: shiftId,
        employeeId,
      },
      data: sanitizedPayload.data,
    });
    return updatedShift;
  });
};
