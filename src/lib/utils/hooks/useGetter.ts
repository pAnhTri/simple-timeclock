import { useCallback, useState } from "react";

export const useGetter = <T, A extends unknown[]>(
  callback: (...args: A) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getterFunction = useCallback(
    async (...args: A) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await callback(...args);

        setData(result);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [callback]
  );

  return { data, error, isLoading, getterFunction };
};
