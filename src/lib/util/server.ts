import dbConnect from "../mongodb/dbConnect";
import Employee from "../mongodb/models/Employee";
import type { Employee as EmployeeType } from "../mongodb/models/Employee";
import TimeLog from "../mongodb/models/TimeLog";
import type { TimeLog as TimeLogType } from "../mongodb/models/TimeLog";

export const getEmployees = async () => {
  try {
    await dbConnect();

    const employees: EmployeeType[] = await Employee.find();

    //Turn this into a plain object
    const employeesPlain = JSON.parse(JSON.stringify(employees));

    return employeesPlain;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTimeLogs = async () => {
  try {
    await dbConnect();

    const timeLogs: TimeLogType[] = await TimeLog.find();

    //Turn this into a plain object
    const timeLogsPlain = JSON.parse(JSON.stringify(timeLogs));

    return timeLogsPlain;
  } catch (error) {
    console.error(error);
    return null;
  }
};
