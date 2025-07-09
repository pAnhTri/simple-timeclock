import { getEmployees } from "@/lib/utils/actions";
import Alert from "@/components/Alert";
import { Stack, Text } from "@mantine/core";
import Clock from "@/components/Clock";
import EmployeeSelect from "@/components/EmployeeSelect";
import { format, startOfToday } from "date-fns";
import EmployeeShiftTable from "@/components/EmployeeShiftTable";
import ClockActionButtons from "@/components/ClockActionButtons";

export default async function Page() {
  // Fetch employee on page load
  const { employees, error } = await getEmployees();

  if (error) {
    return (
      <Alert
        title="Error: Fetching Employees"
        variant="full-screen"
        iconSize={100}
      >
        {error}
      </Alert>
    );
  }

  if (employees.length === 0) {
    return (
      <Alert title="No employees found" variant="full-screen" iconSize={100}>
        Add an employee to get started
      </Alert>
    );
  }

  return (
    <div className="full-screen-container justify-center items-center">
      <Stack
        align="center"
        gap="md"
        justify="center"
        className="p-4 border-2 border-gray-200 rounded-md"
      >
        {/* Title */}
        <Text component="h1" className="text-2xl font-bold">
          Time Tracker
        </Text>
        {/* Clock */}
        <Clock />
        {/* Employee Select */}
        <EmployeeSelect employees={employees} />
        {/* Current Date Label */}
        <Text size="xl">
          Showing Timesheet for:{" "}
          <span className="text-2xl">{format(startOfToday(), "PPP")}</span>
        </Text>
        {/* Employee Shift Table */}
        <EmployeeShiftTable />
        {/* Clock Action Buttons */}
        <ClockActionButtons />
      </Stack>
    </div>
  );
}
