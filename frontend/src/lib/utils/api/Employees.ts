import axios from "axios";
import { Employee as EmployeeType } from "@/lib/mongoDB/model/Employee";

export const getEmployees = async (): Promise<EmployeeType[]> => {
  try {
    const { data } = await axios.get("/api/employees");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error: ${error.response?.data || error.message}`);
    } else {
      console.error(`Error: ${error}`);
    }
    throw new Error("Failed to fetch employees");
  }
};
