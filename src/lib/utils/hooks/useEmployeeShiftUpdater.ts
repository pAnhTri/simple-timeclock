import { useEmployeeStore, useShiftStore } from "@/lib/zustand";
import { Employee, Shift } from "prisma/generated/prisma";
import { useCallback, useState } from "react";
import { createShift, updateEmployee, updateShift } from "../api";

export const useEmployeeShiftUpdater = () => {
  const setCurrentEmployee = useEmployeeStore(
    (state) => state.setCurrentEmployee
  );
  const setIsEmployeeLoading = useEmployeeStore((state) => state.setIsLoading);

  const setCurrentShift = useShiftStore((state) => state.setCurrentShift);
  const setIsShiftLoading = useShiftStore((state) => state.setIsLoading);

  const [error, setError] = useState<string | null>(null);

  const updateEmployeeShift = useCallback(
    async (
      employee: Employee,
      shift: Shift | null,
      employeePayload: Partial<Employee>,
      shiftPayload?: Partial<Shift>
    ) => {
      setError(null);
      setIsEmployeeLoading(true);
      setIsShiftLoading(true);

      try {
        // Update employee
        const updatedEmployee = await updateEmployee(employee, employeePayload);
        setCurrentEmployee(updatedEmployee);

        // Update or create shift based on whether shift exists
        let updatedShift: Shift;
        if (!shift) {
          updatedShift = await createShift(new Date(), employee.id);
        } else {
          updatedShift = await updateShift(shift, shiftPayload!);
        }
        setCurrentShift(updatedShift);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsEmployeeLoading(false);
        setIsShiftLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { error, updateEmployeeShift };
};
