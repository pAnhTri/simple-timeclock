import { Shift } from "prisma/generated/prisma";
import { create } from "zustand";

interface ShiftStore {
  currentShift: Shift | null;
  isLoading: boolean;
  setCurrentShift: (shift: Shift | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useShiftStore = create<ShiftStore>((set) => ({
  currentShift: null,
  isLoading: false,
  setCurrentShift: (shift) => set({ currentShift: shift }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
