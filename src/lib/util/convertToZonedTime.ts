import { toZonedTime } from "date-fns-tz";

export const convertToZonedTime = (date: Date) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return toZonedTime(date, timezone);
};
