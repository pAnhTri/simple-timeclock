import { Employee } from "prisma/generated/prisma";
import { create } from "zustand";

interface EmployeeStore {
  currentEmployee: Employee | null;
  isLoading: boolean;
  hasWorkedEightHours: boolean;
  setCurrentEmployee: (employee: Employee | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasWorkedEightHours: (hasWorkedEightHours: boolean) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  currentEmployee: null,
  isLoading: false,
  hasWorkedEightHours: false,
  setCurrentEmployee: (employee) => set({ currentEmployee: employee }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setHasWorkedEightHours: (hasWorkedEightHours) => set({ hasWorkedEightHours }),
}));
