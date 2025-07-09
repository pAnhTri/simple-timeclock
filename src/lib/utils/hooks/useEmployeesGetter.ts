import { Employee } from "prisma/generated/prisma";
import { useCallback, useState } from "react";
import { getEmployees as getEmployeesApi } from "../api";

export const useEmployeesGetter = () => {
  const [data, setData] = useState<Employee[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Manual
  const getEmployees = useCallback(async () => {
    // Reset states
    setData(null);
    setError(null);
    setIsLoading(true);

    try {
      const employees = await getEmployeesApi();
      setData(employees);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, getEmployees };
};
