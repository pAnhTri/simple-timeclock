"use client";

import { useCallback, useState } from "react";
import { signIn, signOut } from "../api/auth";
import { useAuthStore } from "@/lib/zustand";
import { getPayload } from "../actions";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const setPayload = useAuthStore((state) => state.setPayload);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await signIn(email, password);
        const accessTokenPayload = await getPayload(response.accessToken);
        if (accessTokenPayload) {
          setPayload(accessTokenPayload);
        }
        return true;
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { login, isLoading, error };
};

export const useLogout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(
    async () => {
      setIsLoading(true);
      setError(null);

      try {
        await signOut();
        router.push("/login");
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

  return { logout, isLoading, error };
};
