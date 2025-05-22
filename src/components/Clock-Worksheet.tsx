import { Cell } from "@/lib/type/cell";
import { convertToZonedTime } from "@/lib/util";
import { cn } from "@/lib/util/cn";
import { getCorrectRow } from "@/lib/util/getCorrectRow";
import useEmployeeStore from "@/lib/zustand/employee";
import useTimeLogStore from "@/lib/zustand/timelog";
import { format, startOfToday } from "date-fns";
import { isSameDay } from "date-fns";
import { HTMLAttributes, useState } from "react";
import { getExcelTimeValue } from "@/lib/util/getExcellTimeValue";
import { saveToExcellSheet } from "@/lib/util/saveToExcellSheet";

const Worksheet = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [worksheet, setWorksheet] = useState<File | null>(null);
  const [correctRow, setCorrectRow] = useState<number | null>(null);

  const timeLogs = useTimeLogStore((state) => state.timeLogs);

  const currentEmployee = useEmployeeStore((state) => state.currentEmployee);

  const currentEmployeeTimeLog = timeLogs.find(
    (timeLog) =>
      timeLog.employeeId === currentEmployee?._id &&
      isSameDay(timeLog.shift, startOfToday())
  );

  const handleWorksheetChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setWorksheet(file);
      const row = await getCorrectRow(file);
      setCorrectRow(row);
    }
  };

  const handleSaveTimeLogToWorksheet = async () => {
    if (worksheet && correctRow) {
      // Need to save to the row number at B, E, G, J
      let B: Cell | null = null;
      let E: Cell | null = null;
      let G: Cell | null = null;
      let J: Cell | null = null;

      if (currentEmployeeTimeLog?.stamps[0]?.clockIn) {
        const BDate = convertToZonedTime(
          currentEmployeeTimeLog?.stamps[0]?.clockIn
        );
        const excelValue = getExcelTimeValue(BDate);
        B = {
          column: "B",
          t: "n",
          v: excelValue,
          w: format(BDate, "h:mm a"),
        };
      }

      if (currentEmployeeTimeLog?.stamps[0]?.clockOut) {
        const EDate = convertToZonedTime(
          currentEmployeeTimeLog?.stamps[0]?.clockOut
        );
        const excelValue = getExcelTimeValue(EDate);
        E = {
          column: "E",
          t: "n",
          v: excelValue,
          w: format(EDate, "h:mm a"),
        };
      }

      if (currentEmployeeTimeLog?.stamps[1]?.clockIn) {
        const GDate = convertToZonedTime(
          currentEmployeeTimeLog?.stamps[1]?.clockIn
        );
        const excelValue = getExcelTimeValue(GDate);
        G = {
          column: "G",
          t: "n",
          v: excelValue,
          w: format(GDate, "h:mm a"),
        };
      }

      if (currentEmployeeTimeLog?.stamps[1]?.clockOut) {
        const JDate = convertToZonedTime(
          currentEmployeeTimeLog?.stamps[1]?.clockOut
        );
        const excelValue = getExcelTimeValue(JDate);
        J = {
          column: "J",
          t: "n",
          v: excelValue,
          w: format(JDate, "h:mm a"),
        };
      }

      console.log(B, E, G, J);

      const cells = [B, E, G, J].filter((cell) => cell !== null);

      const blob = await saveToExcellSheet(worksheet, correctRow, cells);

      const url = URL.createObjectURL(blob as Blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentEmployee?.name}-${format(
        startOfToday(),
        "MM-dd-yyyy"
      )}.xlsx`;
      a.click();
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {!worksheet && (
        <div className="flex flex-col gap-2">
          <label htmlFor="worksheet" className="text-sm font-medium">
            Upload Worksheet
          </label>
          <input
            id="worksheet"
            type="file"
            accept=".xlsx"
            onChange={handleWorksheetChange}
            className="rounded-md border border-gray-300 p-2"
          />
        </div>
      )}
      {worksheet && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">Loaded Worksheet:</h3>
            <p>{worksheet.name}</p>
            <p>Corresponding Row: {correctRow}</p>
          </div>
          <button
            className="rounded-md border border-gray-300 p-2"
            onClick={handleSaveTimeLogToWorksheet}
          >
            Save Time Log to Worksheet
          </button>
        </div>
      )}
    </div>
  );
};

export default Worksheet;
