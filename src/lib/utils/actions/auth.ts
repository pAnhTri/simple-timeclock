"use server";

import { verifyToken } from "../token";

export const getPayload = async (accessToken: string) => {
  try {
    const payload = await verifyToken(accessToken);
    return payload;
  } catch (error) {
    throw error;
  }
};
