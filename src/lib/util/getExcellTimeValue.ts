import { getHours, getMinutes } from "date-fns";

export const getExcelTimeValue = (date: Date): number => {
  const hours = getHours(date);
  const minutes = getMinutes(date);
  return (hours + minutes / 60) / 24;
};
