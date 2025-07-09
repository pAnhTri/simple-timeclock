import { useCallback, useState } from "react";
import { getShiftOfEmployeeByDate } from "../api";
import { useShiftStore } from "@/lib/zustand";

export const useShiftGetter = () => {
  const setCurrentShift = useShiftStore((state) => state.setCurrentShift);
  const setIsLoading = useShiftStore((state) => state.setIsLoading);

  const [error, setError] = useState<string | null>(null);

  const getShift = useCallback(async (employeeId: string, date: Date) => {
    // Reset state
    setCurrentShift(null);
    setError(null);
    setIsLoading(true);

    try {
      const shift = await getShiftOfEmployeeByDate(employeeId, date);
      setCurrentShift(shift);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { error, getShift };
};
