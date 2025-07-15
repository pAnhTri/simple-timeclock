import { useCallback, useState } from "react";
import { createEmployee as createEmployeeApi } from "../api";
import { Employee } from "prisma/generated/prisma";

export const useEmployeeCreater = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Manual
  const createEmployee = useCallback(async (payload: Partial<Employee>) => {
    // Reset states
    setError(null);
    setIsLoading(true);

    try {
      await createEmployeeApi(payload);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, isLoading, createEmployee };
};
