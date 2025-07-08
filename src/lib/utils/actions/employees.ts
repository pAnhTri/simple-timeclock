"use server";

import { Employee, PrismaClient } from "prisma/generated/prisma";

const prisma = new PrismaClient();

export const getEmployees = async (): Promise<Employee[] | string> => {
  try {
    const employees = await prisma.employee.findMany();
    return employees;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  } finally {
    await prisma.$disconnect();
  }
};
