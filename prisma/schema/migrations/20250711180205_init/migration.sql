-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isClockedIn" BOOLEAN NOT NULL DEFAULT false,
    "isOnFirstBreak" BOOLEAN NOT NULL DEFAULT false,
    "isOnLunchBreak" BOOLEAN NOT NULL DEFAULT false,
    "isOnSecondBreak" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "clockInTime" TIMESTAMP(3),
    "firstBreakStartTime" TIMESTAMP(3),
    "firstBreakEndTime" TIMESTAMP(3),
    "lunchStartTime" TIMESTAMP(3),
    "lunchEndTime" TIMESTAMP(3),
    "secondBreakStartTime" TIMESTAMP(3),
    "secondBreakEndTime" TIMESTAMP(3),
    "clockOutTime" TIMESTAMP(3),

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "jit" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_email_idx" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Shift_employeeId_date_idx" ON "Shift"("employeeId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Shift_employeeId_date_key" ON "Shift"("employeeId", "date");

-- CreateIndex
CREATE INDEX "Token_jit_idx" ON "Token"("jit");

-- CreateIndex
CREATE UNIQUE INDEX "Token_jit_key" ON "Token"("jit");

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
