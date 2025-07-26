"use client";

import { useCallback, useState } from "react";
import { signIn, signOut } from "../api/auth";
import { useAuthStore } from "@/lib/zustand";
import { getPayload } from "../actions";
import { useRouter } from "next/navigation";

export const useLogInOutAction = <T, A extends unknown[] = []>(
  callback: (...args: A) => Promise<T>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actionWrapper = useCallback(
    async (...args: A): Promise<T | undefined> => {
      setIsLoading(true);
      setError(null);

      try {
        return await callback(...args);
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

  return { actionWrapper, isLoading, error };
};

export const useLogin = () => {
  const setPayload = useAuthStore((state) => state.setPayload);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await signIn(email, password);
      const accessTokenPayload = await getPayload(response.accessToken);
      if (accessTokenPayload) {
        setPayload(accessTokenPayload);
      }
      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    actionWrapper: loginAction,
    isLoading,
    error,
  } = useLogInOutAction<boolean, [email: string, password: string]>(login);

  return { loginAction, isLoading, error };
};

export const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(
    async () => {
      await signOut();
      router.push("/login");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    actionWrapper: logoutAction,
    isLoading,
    error,
  } = useLogInOutAction<void>(logout);

  return { logoutAction, isLoading, error };
};
