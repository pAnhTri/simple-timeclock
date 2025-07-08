-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isClockedIn" BOOLEAN NOT NULL DEFAULT false,
    "isOnFirstBreak" BOOLEAN NOT NULL DEFAULT false,
    "isOnLunchBreak" BOOLEAN NOT NULL DEFAULT false,
    "isOnSecondBreak" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "clockInTime" TIMESTAMP(3) NOT NULL,
    "firstBreakStartTime" TIMESTAMP(3) NOT NULL,
    "firstBreakEndTime" TIMESTAMP(3) NOT NULL,
    "lunchStartTime" TIMESTAMP(3) NOT NULL,
    "lunchEndTime" TIMESTAMP(3) NOT NULL,
    "secondBreakStartTime" TIMESTAMP(3) NOT NULL,
    "secondBreakEndTime" TIMESTAMP(3) NOT NULL,
    "clockOutTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Shift_employeeId_date_idx" ON "Shift"("employeeId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Shift_employeeId_date_key" ON "Shift"("employeeId", "date");

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
