import { JWTPayload } from "jose";
import { create } from "zustand";

interface AuthState {
  payload: JWTPayload | null;
  setPayload: (payload: JWTPayload) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  payload: null,
  setPayload: (payload) => set({ payload }),
}));
