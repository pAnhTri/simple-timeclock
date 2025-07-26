import { PrismaClient } from "prisma/generated/prisma";

export const prismaActionWrapper = async <T, A extends unknown[] = []>(
  callback: (...args: A) => Promise<T>,
  ...args: A
): Promise<T> => {
  const prisma = new PrismaClient();

  try {
    return await callback(...args);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  } finally {
    await prisma.$disconnect();
  }
};
