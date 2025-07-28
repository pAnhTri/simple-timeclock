"use client";

import { useAuthStore } from "@/lib/zustand";
import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import {
  useEmployee,
  useShiftToday,
  useShiftTodayUpdate,
} from "@/lib/utils/hooks";
import Alert from "./Alert";
import { format } from "date-fns";

const ClockActionButtons = () => {
  const payload = useAuthStore((state) => state.payload);
  const {
    shift,
    isLoading: isShiftLoading,
    error: shiftError,
  } = useShiftToday(payload?.id as string, false);
  const {
    employee,
    isLoading: isEmployeeLoading,
    error: employeeError,
  } = useEmployee(payload?.id as string, false);

  const {
    isLoading: isShiftUpdateLoading,
    error: isShiftUpdateError,
    updateShiftAction,
  } = useShiftTodayUpdate(payload?.id as string);

  const isLoading = isEmployeeLoading || isShiftLoading || isShiftUpdateLoading;
  const isShiftCompleted = !!shift?.clockInTime && !!shift?.clockOutTime;

  const isFirstBreakCompleted =
    !!shift?.firstBreakStartTime && !!shift?.firstBreakEndTime;

  const isLunchBreakCompleted =
    !!shift?.lunchStartTime && !!shift?.lunchEndTime;

  const isSecondBreakCompleted =
    !!shift?.secondBreakStartTime && !!shift?.secondBreakEndTime;

  const copyToClipboard = async (text: string) => {
    // Use clipboard API if available AND we're in a secure context
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        console.error("navigator.clipboard failed:", e);
      }
    }

    // Fallback method for HTTP or unsupported browsers
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.setAttribute("readonly", "");

      document.body.appendChild(textarea);
      textarea.select();

      const success = document.execCommand("copy");
      document.body.removeChild(textarea);

      return success;
    } catch (e) {
      console.error("Fallback clipboard copy failed:", e);
      return false;
    }
  };

  const formatTimeForCopy = (date: Date | null | undefined): string => {
    if (!date) return "";
    return format(date, "hh:mm:ss a");
  };

  const handleCopyPreLunch = async () => {
    if (!shift) return;

    const preLunchData = [
      formatTimeForCopy(shift.clockInTime),
      formatTimeForCopy(shift.firstBreakStartTime),
      formatTimeForCopy(shift.firstBreakEndTime),
      formatTimeForCopy(shift.lunchStartTime),
    ].join("\t");

    try {
      await copyToClipboard(preLunchData);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleCopyPostLunch = async () => {
    if (!shift) return;

    const postLunchData = [
      formatTimeForCopy(shift.lunchEndTime),
      formatTimeForCopy(shift.secondBreakStartTime),
      formatTimeForCopy(shift.secondBreakEndTime),
      formatTimeForCopy(shift.clockOutTime),
    ].join("\t");

    try {
      await copyToClipboard(postLunchData);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleClockInClick = async () => {
    if (!employee) return;
    await updateShiftAction({
      isClockedIn: true,
    });
  };

  const handleClockOutClick = async () => {
    if (!employee) return;
    await updateShiftAction(
      {
        isClockedIn: false,
      },
      {
        clockOutTime: new Date(),
      }
    );
  };

  const handleFirstBreakClick = async () => {
    if (!employee) return;
    await updateShiftAction(
      {
        isOnFirstBreak: !employee?.isOnFirstBreak,
      },
      {
        firstBreakStartTime: !employee?.isOnFirstBreak ? new Date() : undefined,
        firstBreakEndTime: employee?.isOnFirstBreak ? new Date() : undefined,
      }
    );
  };

  const handleLunchClick = async () => {
    if (!employee) return;
    await updateShiftAction(
      {
        isOnLunchBreak: !employee?.isOnLunchBreak,
      },
      {
        lunchStartTime: !employee?.isOnLunchBreak ? new Date() : undefined,
        lunchEndTime: employee?.isOnLunchBreak ? new Date() : undefined,
      }
    );
  };

  const handleSecondBreakClick = async () => {
    if (!employee) return;
    await updateShiftAction(
      {
        isOnSecondBreak: !employee?.isOnSecondBreak,
      },
      {
        secondBreakStartTime: !employee?.isOnSecondBreak
          ? new Date()
          : undefined,
        secondBreakEndTime: employee?.isOnSecondBreak ? new Date() : undefined,
      }
    );
  };

  return (
    <>
      {(isShiftUpdateError || employeeError || shiftError) && (
        <Alert color="red" title="Error">
          <Text>{isShiftUpdateError || employeeError || shiftError}</Text>
        </Alert>
      )}
      <Group justify="space-between" pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
        />

        <Button
          disabled={employee?.isClockedIn || isLoading || isShiftCompleted}
          onClick={handleClockInClick}
          color="green"
        >
          Clock In
        </Button>
        <Button
          disabled={
            !employee?.isClockedIn ||
            isLoading ||
            isShiftCompleted ||
            isFirstBreakCompleted
          }
          onClick={handleFirstBreakClick}
          color={employee?.isOnFirstBreak ? "purple" : "yellow"}
        >
          First Break {employee?.isOnFirstBreak ? "End" : "Start"}
        </Button>
        <Button
          disabled={
            !employee?.isClockedIn ||
            isLoading ||
            isShiftCompleted ||
            isLunchBreakCompleted
          }
          onClick={handleLunchClick}
          color={employee?.isOnLunchBreak ? "orange" : "blue"}
        >
          Lunch {employee?.isOnLunchBreak ? "End" : "Start"}
        </Button>
        <Button
          disabled={
            !employee?.isClockedIn ||
            isLoading ||
            isShiftCompleted ||
            isSecondBreakCompleted
          }
          onClick={handleSecondBreakClick}
          color={employee?.isOnSecondBreak ? "purple" : "yellow"}
        >
          Second Break {employee?.isOnSecondBreak ? "End" : "Start"}
        </Button>
        <Button
          disabled={!employee?.isClockedIn || isLoading || isShiftCompleted}
          onClick={handleClockOutClick}
          color="red"
        >
          Clock Out
        </Button>
      </Group>

      {/* Copy Buttons */}
      <Group justify="center" mt="md">
        <Button
          disabled={!shift || isLoading}
          onClick={handleCopyPreLunch}
          color="gray"
          variant="outline"
        >
          Copy Pre Lunch
        </Button>
        <Button
          disabled={!shift || isLoading}
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
