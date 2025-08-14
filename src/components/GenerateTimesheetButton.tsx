"use client";

import { updatePayPeriodInExcel } from "@/lib/utils/actions";
import { useAuthStore } from "@/lib/zustand";
import { Button } from "@mantine/core";

const GenerateTimesheetButton = () => {
  const payload = useAuthStore((state) => state.payload);

  const handleGenerateTimesheet = async () => {
    await updatePayPeriodInExcel();
  };

  return <Button onClick={handleGenerateTimesheet}>Generate Timesheet</Button>;
};

export default GenerateTimesheetButton;
