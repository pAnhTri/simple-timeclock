"use client";

import { useShiftGetter } from "@/lib/utils/hooks";
import { useEmployeeStore, useShiftStore } from "@/lib/zustand";
import { Select, Text } from "@mantine/core";
import { startOfToday } from "date-fns";
import { Employee } from "prisma/generated/prisma";
import { useEffect, useMemo, useState } from "react";
import Alert from "./Alert";

interface EmployeeSelectProps {
  employees: Employee[];
}

const EmployeeSelect = ({ employees }: EmployeeSelectProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const { error, getShift } = useShiftGetter();

  const currentEmployee = useEmployeeStore((state) => state.currentEmployee);
  const setCurrentEmployee = useEmployeeStore(
    (state) => state.setCurrentEmployee
  );

  const isShiftLoading = useShiftStore((state) => state.isLoading);
  const isEmployeeLoading = useEmployeeStore((state) => state.isLoading);

  // Default to first employee on mount
  useEffect(() => {
    const initializeShift = async () => {
      if (!isInitialized && employees.length > 0) {
        const employee = employees[0];
        setCurrentEmployee(employee);
        await getShift(employee.id, startOfToday());
        setIsInitialized(true);
      }
    };

    initializeShift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const employeeData = useMemo(() => {
    return employees.map((employee) => ({
      value: employee.id,
      label: employee.name,
    }));
  }, [employees]);

  const handleChange = async (value: string | null) => {
    const employee = employees.find((employee) => employee.id === value);
    if (employee) {
      setCurrentEmployee(employee);
      await getShift(employee.id, startOfToday());
    }
  };

  return (
    <>
      {error && (
        <Alert color="red" title="Error">
          <Text>{error}</Text>
        </Alert>
      )}
      <Select
        data={employeeData}
        value={currentEmployee?.id || null}
        onChange={handleChange}
        disabled={!isInitialized || isShiftLoading || isEmployeeLoading}
        nothingFoundMessage="No employees found"
        placeholder="Select an employee"
        label="Employee"
        searchable
        withCheckIcon={false}
        size="xl"
        classNames={{
          label: "mb-2 text-sm",
        }}
      />
    </>
  );
};

export default EmployeeSelect;
