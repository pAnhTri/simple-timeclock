import axios from "axios";
import { Employee } from "prisma/generated/prisma";
import { getAxiosError } from "../getAxiosError";

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const { data: employees } = await axios.get<Employee[]>("/api/employees");
    return employees;
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const { data: employee } = await axios.get<Employee>(
      `/api/employees/${encodeURIComponent(id)}`
    );

    return employee;
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};

export const createEmployee = async (
  payload: Partial<Employee>
): Promise<Employee> => {
  try {
    const { data: newEmployee } = await axios.post<Employee>(
      "/api/employees",
      payload
    );
    return newEmployee;
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};

export const updateEmployee = async (
  employee: Employee,
  payload: Partial<Employee>
): Promise<Employee> => {
  try {
    const { data: updatedEmployee } = await axios.patch<Employee>(
      `/api/employees/${encodeURIComponent(employee.id)}`,
      payload
    );
    return updatedEmployee;
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};

export const deleteEmployee = async (employee: Employee): Promise<void> => {
  try {
    await axios.delete<Employee>(
      `/api/employees/${encodeURIComponent(employee.id)}`
    );
  } catch (error) {
    throw new Error(getAxiosError(error));
  }
};
