import { useCallback, useState } from "react";
import { deleteEmployee as deleteEmployeeApi } from "../api/employees";
import { Employee } from "prisma/generated/prisma";

export const useEmployeeDeleter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEmployee = useCallback(async (employee: Employee) => {
    setError(null);
    setIsLoading(true);

    try {
      await deleteEmployeeApi(employee);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, deleteEmployee };
};
