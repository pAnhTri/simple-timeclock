import axios from "axios";
import { Shift } from "prisma/generated/prisma";
import { getAxiosError } from "../getAxiosError";

export const getShiftOfEmployeeByDate = async (
  employeeId: string,
  date: Date
): Promise<Shift | null> => {
  try {
    const { data: shift } = await axios.get<Shift | null>(
      `/api/shifts/${encodeURIComponent(employeeId)}/${encodeURIComponent(
        date.toISOString()
      )}`
    );
    return shift;
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};

export const createShift = async (
  date: Date,
  employeeId: string
): Promise<Shift> => {
  try {
    const { data: shift } = await axios.post<Shift>("/api/shifts", {
      date,
      employeeId,
    });
    return shift;
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};

export const updateShift = async (
  shift: Shift,
  payload: Partial<Shift>
): Promise<Shift> => {
  try {
    const { data: updatedShift } = await axios.patch<Shift>(
      `/api/shifts/${encodeURIComponent(shift.id)}`,
      payload
    );
    return updatedShift;
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};
