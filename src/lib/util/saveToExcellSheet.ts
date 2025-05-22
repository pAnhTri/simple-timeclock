import { read, write } from "xlsx";
import { Cell } from "../type/cell";

export const saveToExcellSheet = (
  worksheet: File,
  row: number,
  cells: Cell[]
) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const fileData = e.target?.result;
        if (!fileData) {
          reject(new Error("No file data received"));
          return;
        }

        // Read with all options to preserve formatting
        const workbook = read(fileData, {
          type: "binary",
          cellStyles: true,
          cellDates: true,
          cellFormula: true,
          cellHTML: true,
          cellText: true,
          sheetStubs: true,
          sheetRows: 0,
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Write data to the sheet while preserving existing cell properties
        cells.forEach((cell: Cell) => {
          const cellRef = `${cell.column}${row}`;
          const existingCell = sheet[cellRef] || {};

          // Preserve existing cell properties while updating values
          sheet[cellRef] = {
            ...existingCell,
            t: cell.t,
            v: cell.v,
            w: cell.w,
          };
        });

        // Write with all options to preserve formatting
        const wbout = write(workbook, {
          bookType: "xlsx",
          type: "binary",
          cellStyles: true,
          cellDates: true,

          sheetStubs: true,
        });

        // Convert binary string to Blob
        const blob = new Blob([s2ab(wbout)], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        resolve(blob);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsArrayBuffer(worksheet);
  });
};

// Helper function to convert string to ArrayBuffer
function s2ab(s: string): ArrayBuffer {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}
