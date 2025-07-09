import { useEmployeeStore } from "@/lib/zustand";
import { Employee } from "prisma/generated/prisma";
import { useCallback, useState } from "react";
import { updateEmployee as updateEmployeeApi } from "../api";

export const useEmployeeUpdater = () => {
  const setCurrentEmployee = useEmployeeStore(
    (state) => state.setCurrentEmployee
  );
  const setIsLoading = useEmployeeStore((state) => state.setIsLoading);
  const [error, setError] = useState<string | null>(null);

  const updateEmployee = useCallback(
    async (employee: Employee, payload: Partial<Employee>) => {
      setError(null);
      setIsLoading(true);

      try {
        const updatedEmployee = await updateEmployeeApi(employee, payload);
        setCurrentEmployee(updatedEmployee);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { error, updateEmployee };
};
