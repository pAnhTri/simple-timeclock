import axios from "axios";
import { Employee as EmployeeType } from "@/lib/mongoDB/model/Employee";

export const getEmployees = async (): Promise<EmployeeType[]> => {
  try {
    const { data: employees } = await axios.get("/api/employees");
    return employees;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error: ${error.response?.data || error.message}`);
    } else {
      console.error(`Error: ${error}`);
    }
    throw new Error("Failed to fetch employees");
  }
};

export const getEmployee = async (_id: string): Promise<EmployeeType> => {
  try {
    const { data: employee } = await axios.get(
      `/api/employees/${encodeURIComponent(_id)}`
    );
    return employee;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error: ${error.response?.data || error.message}`);
    } else {
      console.error(`Error: ${error}`);
    }
    throw new Error("Failed to fetch employee");
  }
};
