"use server";

import { PrismaClient } from "prisma/generated/prisma";
import { spawn } from "child_process";
import { join } from "path";
import { platform } from "os";

export const prismaActionWrapper = async <T, A extends unknown[] = []>(
  callback: (...args: A) => Promise<T>,
  ...args: A
): Promise<T> => {
  const prisma = new PrismaClient();

  try {
    return await callback(...args);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const getPayPeriodFromExcel = async (): Promise<{
  start_date: string;
  end_date: string;
}> => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = "src/lib/python/get_pay_period.py";

    const isWindows = platform() === "win32";
    const venvPythonPath = isWindows
      ? join(process.cwd(), ".venv", "Scripts", "python.exe")
      : join(process.cwd(), ".venv", "bin", "python");

    const pythonProcess = spawn(venvPythonPath, [pythonScriptPath], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve(JSON.parse(output.trim()));
      } else {
        reject(
          new Error(`Python script failed with code ${code}: ${errorOutput}`)
        );
      }
    });

    pythonProcess.on("error", (error) => {
      reject(new Error(`Failed to start Python process: ${error.message}`));
    });
  });
};

export const updatePayPeriodInExcel = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = "src/lib/python/update_pay_period.py";

    const isWindows = platform() === "win32";
    const venvPythonPath = isWindows
      ? join(process.cwd(), ".venv", "Scripts", "python.exe")
      : join(process.cwd(), ".venv", "bin", "python");

    const pythonProcess = spawn(venvPythonPath, [pythonScriptPath], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    pythonProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Python script failed with code ${code}`));
      }
    });

    pythonProcess.on("error", (error) => {
      reject(new Error(`Failed to start Python process: ${error.message}`));
    });
  });
};
