import Alert from "@/components/Alert";
import AddEmployeePopover from "@/components/Settings/AddEmployeePopover";
import DeleteEmployeeModal from "@/components/Settings/DeleteEmployeeModal";
import NameEditModal from "@/components/Settings/NameEditModal";
import { getEmployees } from "@/lib/utils/actions";
import { Affix, Button, Group, Stack, Table, Text } from "@mantine/core";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const SettingPage = async () => {
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
  return (
    <>
      <Affix position={{ top: 20, left: 20 }}>
        <Button
          component={Link}
          href="/"
          color="gray"
          size="lg"
          variant="subtle"
        >
          <FiArrowLeft size={20} />
        </Button>
      </Affix>
      <div className="full-screen-container items-center p-8">
        <Stack gap="md">
          <Text component="h1" className="text-2xl font-bold">
            Settings Dashboard
          </Text>
          <Group justify="space-between">
            <Text>Employees</Text>
            <AddEmployeePopover />
          </Group>
          <Table
            striped
            highlightOnHover
            data={{
              head: ["Name", "Actions"],
              body: employees.map((employee) => [
                employee.name,
                <Group key={employee.id} gap="xs">
                  <NameEditModal employee={employee} />
                  <DeleteEmployeeModal employee={employee} />
                </Group>,
              ]),
            }}
            withTableBorder
          />
        </Stack>
      </div>
    </>
  );
};

export default SettingPage;
