import { useCallback, useState } from "react";
import { openExcelApi } from "../api";

export const useExcelOpener = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openExcel = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await openExcelApi();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, openExcel };
};
