"use client";

import { useEmployeeStore, useShiftStore } from "@/lib/zustand";
import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { useEmployeeShiftUpdater } from "@/lib/utils/hooks";
import Alert from "./Alert";
import { format } from "date-fns";

const ClockActionButtons = () => {
  const currentEmployee = useEmployeeStore((state) => state.currentEmployee);
  const currentShift = useShiftStore((state) => state.currentShift);

  const isEmployeeLoading = useEmployeeStore((state) => state.isLoading);
  const isShiftLoading = useShiftStore((state) => state.isLoading);

  const isLoading = isEmployeeLoading || isShiftLoading;
  const isShiftCompleted =
    !!currentShift?.clockInTime && !!currentShift?.clockOutTime;

  const isFirstBreakCompleted =
    !!currentShift?.firstBreakStartTime && !!currentShift?.firstBreakEndTime;

  const isLunchBreakCompleted =
    !!currentShift?.lunchStartTime && !!currentShift?.lunchEndTime;

  const isSecondBreakCompleted =
    !!currentShift?.secondBreakStartTime && !!currentShift?.secondBreakEndTime;

  const { error, updateEmployeeShift } = useEmployeeShiftUpdater();

  const formatTimeForCopy = (date: Date | null | undefined): string => {
    if (!date) return "\t";
    return format(date, "hh:mm:ss a");
  };

  const handleCopyPreLunch = async () => {
    if (!currentShift) return;

    const preLunchData = [
      formatTimeForCopy(currentShift.clockInTime),
      formatTimeForCopy(currentShift.firstBreakStartTime),
      formatTimeForCopy(currentShift.firstBreakEndTime),
      formatTimeForCopy(currentShift.lunchStartTime),
    ].join("\t");

    try {
      await navigator.clipboard.writeText(preLunchData);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleCopyPostLunch = async () => {
    if (!currentShift) return;

    const postLunchData = [
      formatTimeForCopy(currentShift.lunchEndTime),
      formatTimeForCopy(currentShift.secondBreakStartTime),
      formatTimeForCopy(currentShift.secondBreakEndTime),
      formatTimeForCopy(currentShift.clockOutTime),
    ].join("\t");

    try {
      await navigator.clipboard.writeText(postLunchData);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleClockInClick = async () => {
    if (!currentEmployee) return;
    await updateEmployeeShift(currentEmployee, currentShift, {
      isClockedIn: true,
    });
  };

  const handleClockOutClick = async () => {
    if (!currentEmployee) return;
    await updateEmployeeShift(
      currentEmployee,
      currentShift,
      {
        isClockedIn: false,
      },
      {
        clockOutTime: new Date(),
      }
    );
  };

  const handleFirstBreakClick = async () => {
    if (!currentEmployee) return;
    await updateEmployeeShift(
      currentEmployee,
      currentShift,
      {
        isOnFirstBreak: !currentEmployee?.isOnFirstBreak,
      },
      {
        firstBreakStartTime: !currentEmployee?.isOnFirstBreak
          ? new Date()
          : undefined,
        firstBreakEndTime: currentEmployee?.isOnFirstBreak
          ? new Date()
          : undefined,
      }
    );
  };

  const handleLunchClick = async () => {
    if (!currentEmployee) return;
    await updateEmployeeShift(
      currentEmployee,
      currentShift,
      {
        isOnLunchBreak: !currentEmployee?.isOnLunchBreak,
      },
      {
        lunchStartTime: !currentEmployee?.isOnLunchBreak
          ? new Date()
          : undefined,
        lunchEndTime: currentEmployee?.isOnLunchBreak ? new Date() : undefined,
      }
    );
  };

  const handleSecondBreakClick = async () => {
    if (!currentEmployee) return;
    await updateEmployeeShift(
      currentEmployee,
      currentShift,
      {
        isOnSecondBreak: !currentEmployee?.isOnSecondBreak,
      },
      {
        secondBreakStartTime: !currentEmployee?.isOnSecondBreak
          ? new Date()
          : undefined,
        secondBreakEndTime: currentEmployee?.isOnSecondBreak
          ? new Date()
          : undefined,
      }
    );
  };

  return (
    <>
      {error && (
        <Alert color="red" title="Error">
          <Text>{error}</Text>
        </Alert>
      )}
      <Group justify="space-between" pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
        />

        <Button
          disabled={
            currentEmployee?.isClockedIn || isLoading || isShiftCompleted
          }
          onClick={handleClockInClick}
          color="green"
        >
          Clock In
        </Button>
        <Button
          disabled={
            !currentEmployee?.isClockedIn ||
            isLoading ||
            isShiftCompleted ||
            isFirstBreakCompleted
          }
          onClick={handleFirstBreakClick}
          color={currentEmployee?.isOnFirstBreak ? "purple" : "yellow"}
        >
          First Break {currentEmployee?.isOnFirstBreak ? "End" : "Start"}
        </Button>
        <Button
          disabled={
            !currentEmployee?.isClockedIn ||
            isLoading ||
            isShiftCompleted ||
            isLunchBreakCompleted
          }
          onClick={handleLunchClick}
          color={currentEmployee?.isOnLunchBreak ? "orange" : "blue"}
        >
          Lunch {currentEmployee?.isOnLunchBreak ? "End" : "Start"}
        </Button>
        <Button
          disabled={
            !currentEmployee?.isClockedIn ||
            isLoading ||
            isShiftCompleted ||
            isSecondBreakCompleted
          }
          onClick={handleSecondBreakClick}
          color={currentEmployee?.isOnSecondBreak ? "purple" : "yellow"}
        >
          Second Break {currentEmployee?.isOnSecondBreak ? "End" : "Start"}
        </Button>
        <Button
          disabled={
            !currentEmployee?.isClockedIn || isLoading || isShiftCompleted
          }
          onClick={handleClockOutClick}
          color="red"
        >
          Clock Out
        </Button>
      </Group>

      {/* Copy Buttons */}
      <Group justify="center" mt="md">
        <Button
          disabled={!currentShift || isLoading}
          onClick={handleCopyPreLunch}
          color="gray"
          variant="outline"
        >
          Copy Pre Lunch
        </Button>
        <Button
          disabled={!currentShift || isLoading}
          onClick={handleCopyPostLunch}
          color="gray"
          variant="outline"
        >
          Copy Post Lunch
        </Button>
      </Group>
    </>
  );
};

export default ClockActionButtons;
