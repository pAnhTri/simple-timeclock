"use client";

import { useShiftToday } from "@/lib/utils/hooks";
import { useAuthStore } from "@/lib/zustand";
import { Alert, LoadingOverlay, Skeleton, Table, Text } from "@mantine/core";
import { format } from "date-fns";
import { useMemo } from "react";

const EmployeeShiftTable = () => {
  const payload = useAuthStore((state) => state.payload);
  const { shift, isLoading, isValidating, error } = useShiftToday(
    payload?.id as string
  );

  const tableData = useMemo(() => {
    if (!shift)
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
          shift.clockInTime ? format(shift.clockInTime, "hh:mm a") : "-",
          shift.firstBreakStartTime
            ? format(shift.firstBreakStartTime, "hh:mm a")
            : "-",
          shift.firstBreakEndTime
            ? format(shift.firstBreakEndTime, "hh:mm a")
            : "-",
          shift.lunchStartTime ? format(shift.lunchStartTime, "hh:mm a") : "-",
          shift.lunchEndTime ? format(shift.lunchEndTime, "hh:mm a") : "-",
          shift.secondBreakStartTime
            ? format(shift.secondBreakStartTime, "hh:mm a")
            : "-",
          shift.secondBreakEndTime
            ? format(shift.secondBreakEndTime, "hh:mm a")
            : "-",
          shift.clockOutTime ? format(shift.clockOutTime, "hh:mm a") : "-",
        ],
      ],
    };
  }, [shift]);

  if (isLoading) return <Skeleton height={20} width={500} />;

  if (error)
    return (
      <Alert color="red" title="Error">
        <Text>{error}</Text>
      </Alert>
    );

  if (!shift) return <Text>No shift found! Please clock in first.</Text>;

  return (
    <div className="relative">
      <LoadingOverlay visible={isValidating} overlayProps={{ blur: 2 }} />
      <Table
        striped
        highlightOnHover
        data={tableData}
        withTableBorder
        classNames={{
          td: "text-center",
        }}
      />
    </div>
  );
};

export default EmployeeShiftTable;
