"use client";

import useSWR from "swr";
import { getEmployeeShiftToday, updateEmployee } from "../actions/employees";
import { useCallback, useState } from "react";
import { Employee, Shift } from "prisma/generated/prisma";
import { useEmployee } from "./employees";
import {
  createShiftByEmployeeId,
  updateShiftByEmployeeId,
} from "../actions/shifts";

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
