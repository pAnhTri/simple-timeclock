"use client";

import {
  generateExcelTimesheet,
  getPayPeriodFromExcel,
  getShiftsByEmployeeIdInPayPeriod,
  updatePayPeriodInExcel,
  downloadTimesheetAction,
  deleteTemporaryTimesheet,
} from "@/lib/utils/actions";
import { useAuthStore } from "@/lib/zustand";
import { Alert, Button, Text } from "@mantine/core";
import { differenceInDays, format } from "date-fns";
import { useState, useRef } from "react";

const GenerateTimesheetButton = () => {
  const payload = useAuthStore((state) => state.payload);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const handleGenerateTimesheet = async () => {
    setIsGenerating(true);
    try {
      await updatePayPeriodInExcel();
      const shifts = await getShiftsByEmployeeIdInPayPeriod(
        payload?.id as string
      );

      const { start_date } = await getPayPeriodFromExcel();

      const excelRowMapping = shifts.map((shift) => {
        const formattedStartDate = start_date.split("-").map(Number);

        const offset = differenceInDays(
          new Date(shift.date || ""),
          new Date(
            formattedStartDate[0],
            formattedStartDate[1] - 1,
            formattedStartDate[2]
          )
        );

        const rowIndex = offset > 6 ? 12 + offset + 1 : 12 + offset; // Cells start at B12'

        return {
          [`B${rowIndex}`]: shift.clockInTime
            ? format(shift.clockInTime, "hh:mm a")
            : null,
          [`C${rowIndex}`]: shift.firstBreakStartTime
            ? format(shift.firstBreakStartTime, "hh:mm a")
            : null,
          [`D${rowIndex}`]: shift.firstBreakEndTime
            ? format(shift.firstBreakEndTime, "hh:mm a")
            : null,
          [`E${rowIndex}`]: shift.lunchStartTime
            ? format(shift.lunchStartTime, "hh:mm a")
            : null,
          [`G${rowIndex}`]: shift.lunchEndTime
            ? format(shift.lunchEndTime, "hh:mm a")
            : null,
          [`H${rowIndex}`]: shift.secondBreakStartTime
            ? format(shift.secondBreakStartTime, "hh:mm a")
            : null,
          [`I${rowIndex}`]: shift.secondBreakEndTime
            ? format(shift.secondBreakEndTime, "hh:mm a")
            : null,
          [`J${rowIndex}`]: shift.clockOutTime
            ? format(shift.clockOutTime, "hh:mm a")
            : null,
        };
      });

      const serializedExelRows = JSON.stringify(excelRowMapping);

      await generateExcelTimesheet(serializedExelRows);

      setIsDownloading(true);
      const downloadResult = await downloadTimesheetAction();
      if (downloadResult.success && downloadResult.blob) {
        const url = window.URL.createObjectURL(downloadResult.blob);
        if (downloadLinkRef.current) {
          downloadLinkRef.current.href = url;
          downloadLinkRef.current.download = "RLG Timesheet.xlsx";
          downloadLinkRef.current.click();
        }
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);

        await deleteTemporaryTimesheet();
      } else {
        setError(downloadResult.error || "Failed to download timesheet");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to generate timesheet"
      );
    } finally {
      setIsGenerating(false);
      setIsDownloading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert color="red" title="Error">
          <Text>{error}</Text>
        </Alert>
      )}
      <Button
        onClick={handleGenerateTimesheet}
        loading={isGenerating || isDownloading}
        color="green"
        variant="outline"
      >
        {isGenerating
          ? "Generating..."
          : isDownloading
          ? "Downloading..."
          : "Generate Timesheet"}
      </Button>
      <a ref={downloadLinkRef} style={{ display: "none" }} />
    </>
  );
};

export default GenerateTimesheetButton;
