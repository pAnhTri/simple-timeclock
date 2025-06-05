import { openFile } from "@/lib/util/api/openFile";
import { cn } from "@/lib/util/cn";
import employeeIndividualFileMap from "@/lib/util/employeeFileMap";
import useEmployeeStore from "@/lib/zustand/employee";
import { HTMLAttributes } from "react";

const OpenFileButton = ({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  const currentEmployee = useEmployeeStore((state) => state.currentEmployee);

  const handleOpenFile = () => {
    if (!currentEmployee) return;

    const employeeName = currentEmployee.name;
    const employeeIndiviualFile = employeeIndividualFileMap.get(employeeName);

    if (!employeeIndiviualFile) return;

    const [individual, file] = employeeIndiviualFile;

    openFile(individual, file);
  };

  return (
    <button
      className={cn(
        "bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600",
        className
      )}
      {...props}
      onClick={handleOpenFile}
    >
      Open File
    </button>
  );
};

export default OpenFileButton;
