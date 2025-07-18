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

  const currentEmployee = useEmployeeStore((state) => state.currentEmployee);
  const setCurrentEmployee = useEmployeeStore(
    (state) => state.setCurrentEmployee
  );

  const { isLoading: isEmployeeLoading, getterFunction: getEmployee } =
    useGetter<Employee, [string]>(getEmployeeById, setCurrentEmployee);

  const payload = useAuthStore((state) => state.payload);

  const { error, getShift } = useShiftGetter();

  // Default to first employee on mount
  useEffect(() => {
    const initializeShift = async () => {
      if (!isInitialized && payload) {
        await getEmployee(payload.id as string);
        if (currentEmployee) {
          setCurrentEmployee(currentEmployee);
          await getShift(currentEmployee.id, startOfToday());
          setIsInitialized(true);
        }
      }
    };

    initializeShift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, currentEmployee]);

  return (
    <>
      {error && (
        <Alert color="red" title="Error">
          <Text>{error}</Text>
        </Alert>
      )}
      {!isEmployeeLoading ? (
        <Title order={2}>{currentEmployee?.name}</Title>
      ) : (
        <Loader size="xl" />
      )}
    </>
  );
};

export default EmployeeSelect;
