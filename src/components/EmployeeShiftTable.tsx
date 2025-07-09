"use client";

import { useShiftStore } from "@/lib/zustand";
import { Skeleton, Table, Text } from "@mantine/core";
import { format } from "date-fns";
import { useMemo } from "react";

const EmployeeShiftTable = () => {
  const currentShift = useShiftStore((state) => state.currentShift);
  const isLoading = useShiftStore((state) => state.isLoading);

  const tableData = useMemo(() => {
    if (!currentShift)
      return {
        head: [],
        body: [],
      };

    return {
      head: [
        "Clock In",
        "First Break Start",
        "First Break End",
        "Lunch Start",
        "Lunch End",
        "Second Break Start",
        "Second Break End",
        "Clock Out",
      ],
      body: [
        [
          currentShift.clockInTime
            ? format(currentShift.clockInTime, "hh:mm a")
            : "-",
          currentShift.firstBreakStartTime
            ? format(currentShift.firstBreakStartTime, "hh:mm a")
            : "-",
          currentShift.firstBreakEndTime
            ? format(currentShift.firstBreakEndTime, "hh:mm a")
            : "-",
          currentShift.lunchStartTime
            ? format(currentShift.lunchStartTime, "hh:mm a")
            : "-",
          currentShift.lunchEndTime
            ? format(currentShift.lunchEndTime, "hh:mm a")
            : "-",
          currentShift.secondBreakStartTime
            ? format(currentShift.secondBreakStartTime, "hh:mm a")
            : "-",
          currentShift.secondBreakEndTime
            ? format(currentShift.secondBreakEndTime, "hh:mm a")
            : "-",
          currentShift.clockOutTime
            ? format(currentShift.clockOutTime, "hh:mm a")
            : "-",
        ],
      ],
    };
  }, [currentShift]);

  if (isLoading) return <Skeleton height={20} width={500} />;

  if (!currentShift) return <Text>No shift found! Please clock in first.</Text>;

  return (
    <Table
      striped
      highlightOnHover
      data={tableData}
      withTableBorder
      classNames={{
        td: "text-center",
      }}
    />
  );
};

export default EmployeeShiftTable;
