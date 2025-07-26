import { Stack, Text } from "@mantine/core";
import Employee from "@/components/Employee";
import { format, startOfToday } from "date-fns";
import EmployeeShiftTable from "@/components/EmployeeShiftTable";
import ClockActionButtons from "@/components/ClockActionButtons";
import { isFlaskConnected } from "@/lib/utils/actions/flask";
import AuthHydrater from "@/components/AuthHydrater";
import HomeActionButtons from "@/components/HomeActionButtons";
import ClockWrapper from "@/components/Clock/ClockWrapper";

export default async function Page() {
  const { isConnected } = await isFlaskConnected();

  return (
    <>
      <AuthHydrater />
      <HomeActionButtons isConnected={isConnected} />
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
          <ClockWrapper />
          {/* Employee Select */}
          <Employee />
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
    </>
  );
}
