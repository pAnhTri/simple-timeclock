import { format, startOfToday } from "date-fns";
import { read } from "xlsx";

export const getCorrectRow = async (
  worksheet: File
): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        console.log(sheet);

        for (let i = 12; i < 27; i++) {
          // Turn today's date into a string of format "m/dd"
          const today = startOfToday();
          const todayString = format(today, "M/d");

          const cell = sheet[`A${i}`];
          if (cell && cell.w && cell.w.includes(todayString)) {
            resolve(i);
            return;
          }
        }
        resolve(null);
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
