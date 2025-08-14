import { Stack, Text } from "@mantine/core";
import Employee from "@/components/Employee";
import { format, startOfToday } from "date-fns";
import EmployeeShiftTable from "@/components/EmployeeShiftTable";
import ClockActionButtons from "@/components/ClockActionButtons";
import { isFlaskConnected } from "@/lib/utils/actions/flask";
import AuthHydrater from "@/components/AuthHydrater";
import HomeActionButtons from "@/components/HomeActionButtons";
import ClockWrapper from "@/components/Clock/ClockWrapper";
import GenerateTimesheetButton from "@/components/GenerateTimesheetButton";

export default async function Page() {
  const { isConnected } = await isFlaskConnected();

  return (
    <>
      <AuthHydrater />
      <HomeActionButtons isConnected={isConnected} />
      <div className="full-screen-container justify-center items-center p-2 md:p-4">
        <Stack
          align="center"
          gap="sm"
          justify="center"
          className="p-3 md:p-4 border-2 border-gray-200 rounded-md w-full max-w-2xl mx-auto"
        >
          {/* Title */}
          <Text component="h1" className="text-xl md:text-2xl font-bold text-center">
            Time Tracker
          </Text>
          {/* Clock */}
          <ClockWrapper />
          {/* Employee Select */}
          <Employee />
          {/* Current Date Label */}
          <Text size="lg" className="text-center">
            Showing Timesheet for:{" "}
            <span className="text-xl md:text-2xl">{format(startOfToday(), "PPP")}</span>
          </Text>
          {/* Employee Shift Table */}
          <EmployeeShiftTable />
          {/* Clock Action Buttons */}
          <ClockActionButtons />
          {/* Generate Timesheet Button - Hidden on mobile */}
          <div className="hidden md:block">
            <GenerateTimesheetButton />
          </div>
        </Stack>
      </div>
    </>
  );
}
