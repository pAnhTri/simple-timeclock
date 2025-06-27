import { Employee as EmployeeType } from "@/lib/mongoDB/model/Employee";
import { cn } from "@/lib/utils";
import { Select, SelectProps } from "@mantine/core";
import { ChangeEventHandler, HTMLAttributes } from "react";

interface EmployeeSelectorProps extends HTMLAttributes<HTMLDivElement> {
  classNames?: SelectProps["classNames"];
  employees: EmployeeType[];
  selectedEmployee: EmployeeType | null;
  setSelectedEmployee: (employee: EmployeeType | null) => void;
}

const EmployeeSelector = ({
  classNames,
  className,
  employees,
  selectedEmployee,
  setSelectedEmployee,
  ...props
}: EmployeeSelectorProps) => {
  const employeeData = employees.map((employee) => ({
    value: employee._id.toString(),
    label: employee.name,
  }));

  const handleChange: SelectProps["onChange"] = (value) => {
    const employee =
      employees.find((employee) => employee._id.toString() === value) || null;
    setSelectedEmployee(employee);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Select
        size="xl"
        data={employeeData}
        placeholder="Select an employee"
        searchable
        clearable
        nothingFoundMessage="No employee found..."
        label={`Selected Employee: ${
          selectedEmployee ? selectedEmployee.name : "None"
        }`}
        withAsterisk
        classNames={classNames}
        onChange={handleChange}
      />
    </div>
  );
};

export default EmployeeSelector;
