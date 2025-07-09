import { useCallback, useState } from "react";
import { createEmployee as createEmployeeApi } from "../api";
import { revalidate } from "../actions";

export const useEmployeeCreater = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Manual
  const createEmployee = useCallback(async (employee: string) => {
    // Reset states
    setError(null);
    setIsLoading(true);

    try {
      await createEmployeeApi(employee);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
      revalidate("/");
    }
  }, []);

  return { error, isLoading, createEmployee };
};
