"use client";

import { useGetter, useShiftGetter } from "@/lib/utils/hooks";
import { useAuthStore, useEmployeeStore } from "@/lib/zustand";
import { Loader, Text, Title } from "@mantine/core";
import { startOfToday } from "date-fns";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import { Employee } from "prisma/generated/prisma";
import { getEmployeeById } from "@/lib/utils/api";

const EmployeeSelect = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    data: employee,
    isLoading: isEmployeeLoading,
    getterFunction: getEmployee,
  } = useGetter<Employee, [string]>(getEmployeeById);

  const payload = useAuthStore((state) => state.payload);

  const { error, getShift } = useShiftGetter();

  const setCurrentEmployee = useEmployeeStore(
    (state) => state.setCurrentEmployee
  );

  // Default to first employee on mount
  useEffect(() => {
    const initializeShift = async () => {
      if (!isInitialized && payload) {
        await getEmployee(payload.id as string);
        if (employee) {
          setCurrentEmployee(employee);
          await getShift(employee.id, startOfToday());
          setIsInitialized(true);
        }
      }
    };

    initializeShift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <>
      {error && (
        <Alert color="red" title="Error">
          <Text>{error}</Text>
        </Alert>
      )}
      {!isEmployeeLoading ? (
        <Title order={2}>{employee?.name}</Title>
      ) : (
        <Loader size="xl" />
      )}
    </>
  );
};

export default EmployeeSelect;
