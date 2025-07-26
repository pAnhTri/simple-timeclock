"use client";

import { Employee } from "prisma/generated/prisma";
import useSWRImmutable from "swr/immutable";
import { getEmployeeById } from "../actions/employees";

export const useEmployee = (
  employeeId: string,
  isValidatingOnMount: boolean = true
) => {
  const {
    data: employee,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWRImmutable<Employee>(
    employeeId ? `employee-${employeeId}` : null,
    () => getEmployeeById(employeeId),
    {
      revalidateOnMount: isValidatingOnMount,
    }
  );

  return {
    employee,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
