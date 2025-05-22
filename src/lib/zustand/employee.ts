import { create } from "zustand";
import { Employee } from "../mongodb/models/Employee";

interface EmployeeStore {
  employees: Employee[];
  currentEmployee: Employee | null;
  setEmployees: (employees: Employee[]) => void;
  setCurrentEmployee: (employee: Employee | null) => void;
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  currentEmployee: null,
  setEmployees: (employees: Employee[]) => set({ employees }),
  setCurrentEmployee: (employee: Employee | null) =>
    set({ currentEmployee: employee }),
}));

export default useEmployeeStore;
