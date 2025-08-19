"use client";

import useSWR from "swr";
import { getEmployeeShiftToday, updateEmployee } from "../actions/employees";
import { useCallback, useEffect, useState } from "react";
import { Employee, Shift } from "prisma/generated/prisma";
import { useEmployee } from "./employees";
import {
  createShiftByEmployeeId,
  updateShiftByEmployeeId,
} from "../actions/shifts";
import { useEmployeeStore } from "@/lib/zustand";
import { differenceInMinutes } from "date-fns";

export const useShiftToday = (
  employeeId: string,
  revalidateOnMount: boolean = true
) => {
  const {
    data: shift,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR(
    employeeId ? `shift-${employeeId}-today` : null,
    () => getEmployeeShiftToday(employeeId),
    {
      revalidateOnMount,
    }
  );

  const setHasWorkedEightHours = useEmployeeStore(
    (state) => state.setHasWorkedEightHours
  );

  useEffect(
    () => {
      let firstBreakTime =
        shift?.firstBreakEndTime && shift?.firstBreakStartTime
          ? differenceInMinutes(
              shift.firstBreakEndTime,
              shift.firstBreakStartTime
            )
          : 0;
      let secondBreakTime =
        shift?.secondBreakEndTime && shift?.secondBreakStartTime
          ? differenceInMinutes(
              shift.secondBreakEndTime,
              shift.secondBreakStartTime
            )
          : 0;
      const lunchTime =
        shift?.lunchEndTime && shift?.lunchStartTime
          ? differenceInMinutes(shift.lunchEndTime, shift.lunchStartTime)
          : 0;

      if (firstBreakTime > 10) firstBreakTime -= 10;
      else firstBreakTime = 0;

      if (secondBreakTime > 10) secondBreakTime -= 10;
      else secondBreakTime = 0;

      const currentTime = new Date();

      const totalTimeWorked = shift?.clockInTime
        ? differenceInMinutes(currentTime, shift.clockInTime) -
          firstBreakTime -
          secondBreakTime -
          lunchTime
        : 0;

      setHasWorkedEightHours(totalTimeWorked >= 480);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shift, isValidating]
  );

  return {
    shift,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};

export const ShiftActionWrapper = <T, A extends unknown[] = []>(
  callback: (...args: A) => Promise<T>
) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const actionWrapper = useCallback(
    async (...args: A): Promise<T | undefined> => {
      setError(null);
      setIsLoading(true);

      try {
        return await callback(...args);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [callback]
  );

  return {
    isLoading,
    error,
    actionWrapper,
  };
};

export const useShiftTodayUpdate = (employeeId: string) => {
  const { mutate: mutateEmployee } = useEmployee(employeeId, false);
  const { shift, mutate: mutateShift } = useShiftToday(employeeId, false);

  const updateShift = useCallback(
    async (
      employeePayload: Partial<Employee>,
      shiftPayload?: Partial<Shift>
    ) => {
      const updatedEmployee = await updateEmployee(employeeId, employeePayload);
      mutateEmployee(updatedEmployee, { revalidate: false });

      if (!shift) {
        const newShift = await createShiftByEmployeeId(employeeId);
        mutateShift(newShift, { revalidate: false });
      } else {
        const updatedShift = await updateShiftByEmployeeId(
          employeeId,
          shift.id,
          shiftPayload || {}
        );
        mutateShift(updatedShift, { revalidate: false });
      }
    },
    [shift, mutateShift, mutateEmployee, employeeId]
  );

  const {
    isLoading,
    error,
    actionWrapper: updateShiftAction,
  } = ShiftActionWrapper(updateShift);

  return {
    isLoading,
    error,
    updateShiftAction,
  };
};
