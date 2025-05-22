import { HTMLAttributes, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ClockFormInput, clockFormSchema } from "@/lib/validators/clockForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/util/cn";
import { updateClockInStatus } from "@/lib/util/api/updateClockInStatus";
import useTimeLogStore from "@/lib/zustand/timelog";
import useEmployeeStore from "@/lib/zustand/employee";
import { getTimeLog } from "@/lib/util/api/getTimeLog";

const ClockForm = ({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) => {
  const currentEmployee = useEmployeeStore((state) => state.currentEmployee);
  const employees = useEmployeeStore((state) => state.employees);
  const setCurrentEmployee = useEmployeeStore(
    (state) => state.setCurrentEmployee
  );

  const setTimeLogs = useTimeLogStore((state) => state.setTimeLogs);

  useEffect(() => {
    setCurrentEmployee(employees[0]);
  }, [employees]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClockFormInput>({
    resolver: zodResolver(clockFormSchema),
    defaultValues: { employeeId: currentEmployee?._id as string },
  });

  const onSubmit: SubmitHandler<ClockFormInput> = async (data) => {
    try {
      const updatedEmployee = await updateClockInStatus(
        data.employeeId,
        currentEmployee?.isClockedIn || false
      );

      console.log(updatedEmployee);

      setCurrentEmployee(updatedEmployee);

      const timeLogs = await getTimeLog();

      setTimeLogs(timeLogs);

      console.log(timeLogs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={cn(
        "flex flex-col gap-2 max-w-lg border-2 border-gray-300 rounded-md p-4",
        className
      )}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-center gap-2">
        <label htmlFor="employeeId">Employee: </label>
        <select
          className="border-2 border-gray-300 rounded-md p-2"
          {...register("employeeId")}
          onChange={(e) =>
            setCurrentEmployee(
              employees.find((employee) => employee._id === e.target.value) ??
                null
            )
          }
          defaultValue={currentEmployee?._id as string}
        >
          {employees.map((employee) => (
            <option key={employee._id as string} value={employee._id as string}>
              {employee.name}
            </option>
          ))}
        </select>
        {errors.employeeId && (
          <p className="text-red-500">{errors.employeeId.message}</p>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {currentEmployee?.isClockedIn ? "Clock Out" : "Clock In"}
      </button>
    </form>
  );
};

export default ClockForm;
