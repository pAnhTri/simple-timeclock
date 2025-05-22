import { cn } from "@/lib/util/cn";
import { convertToZonedTime } from "@/lib/util/convertToZonedTime";
import useEmployeeStore from "@/lib/zustand/employee";
import useTimeLogStore from "@/lib/zustand/timelog";
import { format, isSameDay, startOfToday } from "date-fns";
import { HTMLAttributes } from "react";

const ClockLog = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const timeLogs = useTimeLogStore((state) => state.timeLogs);

  const currentEmployee = useEmployeeStore((state) => state.currentEmployee);

  const currentEmployeeTimeLog = timeLogs.find(
    (timeLog) =>
      timeLog.employeeId === currentEmployee?._id &&
      isSameDay(timeLog.shift, startOfToday())
  );

  return (
    <div className={cn(className)} {...props}>
      <h2 className="text-2xl m-4">
        Clock In/Out Log for{" "}
        <span className="font-bold">
          {format(
            currentEmployeeTimeLog?.shift ?? startOfToday(),
            "EEE M/d/yyyy"
          )}
        </span>
      </h2>

      {/* Two rows: labels on top, data below */}
      <div className="flex flex-col gap-2">
        {/* Labels row */}
        <div className="flex gap-4 justify-between items-center">
          <div className="w-24 text-center">
            <p>Clock In</p>
          </div>
          <div className="w-24 text-center">
            <p>Lunch In</p>
          </div>
          <div className="w-24 text-center">
            <p>Lunch Out</p>
          </div>
          <div className="w-24 text-center">
            <p>Clock Out</p>
          </div>
        </div>

        {/* Data row */}
        <div className="flex gap-4 justify-between items-center bg-gray-50 p-2 rounded">
          <div className="w-24 text-center">
            <p className="text-lg font-semibold">
              {currentEmployeeTimeLog?.stamps[0]?.clockIn
                ? format(
                    convertToZonedTime(
                      currentEmployeeTimeLog.stamps[0].clockIn
                    ),
                    "h:mm a"
                  )
                : "-"}
            </p>
          </div>
          <div className="w-24 text-center">
            <p className="text-lg font-semibold">
              {currentEmployeeTimeLog?.stamps[0]?.clockOut
                ? format(
                    convertToZonedTime(
                      currentEmployeeTimeLog.stamps[0].clockOut
                    ),
                    "h:mm a"
                  )
                : "-"}
            </p>
          </div>
          <div className="w-24 text-center">
            <p className="text-lg font-semibold">
              {currentEmployeeTimeLog?.stamps[1]?.clockIn
                ? format(
                    convertToZonedTime(
                      currentEmployeeTimeLog.stamps[1].clockIn
                    ),
                    "h:mm a"
                  )
                : "-"}
            </p>
          </div>
          <div className="w-24 text-center">
            <p className="text-lg font-semibold">
              {currentEmployeeTimeLog?.stamps[1]?.clockOut
                ? format(
                    convertToZonedTime(
                      currentEmployeeTimeLog.stamps[1].clockOut
                    ),
                    "h:mm a"
                  )
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {/* Copy buttons below the log */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            const clockIn = currentEmployeeTimeLog?.stamps[0]?.clockIn
              ? format(
                  convertToZonedTime(currentEmployeeTimeLog.stamps[0].clockIn),
                  "h:mm a"
                )
              : "";
            const clockOut = currentEmployeeTimeLog?.stamps[0]?.clockOut
              ? format(
                  convertToZonedTime(currentEmployeeTimeLog.stamps[0].clockOut),
                  "h:mm a"
                )
              : "";
            navigator.clipboard.writeText(`${clockIn}\t\t\t${clockOut}`);
          }}
        >
          Copy Pre Lunch
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => {
            const clockIn = currentEmployeeTimeLog?.stamps[1]?.clockIn
              ? format(
                  convertToZonedTime(currentEmployeeTimeLog.stamps[1].clockIn),
                  "h:mm a"
                )
              : "";
            const clockOut = currentEmployeeTimeLog?.stamps[1]?.clockOut
              ? format(
                  convertToZonedTime(currentEmployeeTimeLog.stamps[1].clockOut),
                  "h:mm a"
                )
              : "";
            navigator.clipboard.writeText(`${clockIn}\t\t\t${clockOut}`);
          }}
        >
          Copy Post Lunch
        </button>
      </div>
    </div>
  );
};

export default ClockLog;
