"use server";

import { readFile, unlink } from "fs/promises";
import { join } from "path";

export const downloadTimesheetAction = async (): Promise<{
  success: boolean;
  error?: string;
  blob?: Blob;
}> => {
  try {
    // Path to the temporary timesheet file
    const timesheetPath = join(
      process.cwd(),
      "src",
      "lib",
      "python",
      "Temporary",
      "RLG Timesheet.xlsx"
    );

    // Check if the file exists and read it
    const fileBuffer = await readFile(timesheetPath);

    // Create a blob from the buffer - convert Buffer to Uint8Array for compatibility
    const blob = new Blob([new Uint8Array(fileBuffer)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return { success: true, blob };
  } catch (error) {
    console.error("Error reading timesheet file:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to read timesheet file",
    };
  }
};

export const deleteTemporaryTimesheet = async (): Promise<void> => {
  const timesheetPath = join(
    process.cwd(),
    "src",
    "lib",
    "python",
    "Temporary",
    "RLG Timesheet.xlsx"
  );

  await unlink(timesheetPath);
};
