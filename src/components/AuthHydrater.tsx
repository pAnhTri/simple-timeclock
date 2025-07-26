"use client";

import { getPayload } from "@/lib/utils/actions";
import { useAuthStore } from "@/lib/zustand";
import { useEffect } from "react";

const AuthHydrater = () => {
  const setPayload = useAuthStore((state) => state.setPayload);

  useEffect(
    () => {
      const handlePayload = async (accessToken: string) => {
        try {
          const payload = await getPayload(accessToken);
          if (payload) {
            setPayload(payload);
          }
        } catch (error) {
          console.error("Error verifying access token:", error);
        }
      };

      // Get access token from cookies
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (!accessToken) return;

      // Decrypt access token
      handlePayload(accessToken);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return null;
};

export default AuthHydrater;
