import { NextRequest, NextResponse } from "next/server";
import { read, write } from "xlsx";
import { promises as fs } from "fs";
import path from "path";
import { Cell } from "@/lib/type/cell";

export const POST = async (req: NextRequest) => {
  try {
    const { row, cells } = await req.json();

    // Read the existing Excel file with all properties
    const filePath = path.join(process.cwd(), "data", "RLG Timesheet.xlsx");
    const fileBuffer = await fs.readFile(filePath);

    // Parse the Excel file with all options to preserve everything
    const workbook = read(fileBuffer, {
      type: "buffer",
      cellStyles: true,
      cellDates: true,
      cellFormula: true,
      cellHTML: true,
      cellText: true,
      sheetStubs: true,
      sheetRows: 0,
      bookDeps: true,
      bookFiles: true,
      bookProps: true,
      bookSheets: true,
      bookVBA: true,
      password: undefined,
      WTF: false,
    });

    // Get the first worksheet
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Write data to the sheet while preserving ALL existing cell properties
    cells.forEach((cell: Cell) => {
      const cellRef = `${cell.column}${row}`;
      const existingCell = sheet[cellRef] || {};

      // Update only the values while preserving all other properties
      sheet[cellRef] = {
        ...existingCell, // Keep all existing properties
        t: cell.t, // Update type
        v: cell.v, // Update value
        w: cell.w, // Update formatted text
      };
    });

    // Write the workbook back with all properties preserved
    const wbout = write(workbook, {
      type: "buffer",
      bookType: "xlsx",
      cellStyles: true,
      cellDates: true,
    });

    // Save the modified file
    await fs.writeFile(filePath, wbout);

    return NextResponse.json({
      success: true,
      message: "Excel file updated successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: error.message,
          },
        },
        { status: 500 }
      );
    }
  }
};
