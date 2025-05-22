import { create } from "zustand";
import { TimeLog } from "../mongodb/models/TimeLog";

interface TimeLogStore {
  timeLogs: TimeLog[];
  setTimeLogs: (timeLogs: TimeLog[]) => void;
}

const useTimeLogStore = create<TimeLogStore>((set) => ({
  timeLogs: [],
  setTimeLogs: (timeLogs: TimeLog[]) => set({ timeLogs }),
}));

export default useTimeLogStore;
