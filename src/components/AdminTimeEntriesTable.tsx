"use client";

import { Shift } from "prisma/generated/prisma";
import { Table, Text, ScrollArea } from "@mantine/core";
import { format } from "date-fns";

interface AdminTimeEntriesTableProps {
  shifts: Shift[];
  isLoading?: boolean;
}

const AdminTimeEntriesTable = ({
  shifts,
  isLoading = false,
}: AdminTimeEntriesTableProps) => {
  if (isLoading) {
    return (
      <ScrollArea h={400}>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th
                style={{ backgroundColor: "#e6f4ea", color: "#1e4620" }}
              >
                Clock In
              </Table.Th>
              <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
                First Break Start
              </Table.Th>
              <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
                First Break End
              </Table.Th>
              <Table.Th
                style={{ backgroundColor: "#fff3cd", color: "#856404" }}
              >
                Lunch Start
              </Table.Th>
              <Table.Th
                style={{ backgroundColor: "#fff3cd", color: "#856404" }}
              >
                Lunch End
              </Table.Th>
              <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
                Second Break Start
              </Table.Th>
              <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
                Second Break End
              </Table.Th>
              <Table.Th
                style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
              >
                Clock Out
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td colSpan={9}>
                <Text ta="center" c="dimmed">
                  Loading...
                </Text>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </ScrollArea>
    );
  }

  if (shifts.length === 0) {
    return (
      <ScrollArea h={400}>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th
                style={{ backgroundColor: "#e6f4ea", color: "#1e4620" }}
              >
                Clock In
              </Table.Th>
              <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
                First Break Start
              </Table.Th>
              <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
                First Break End
              </Table.Th>
              <Table.Th
                style={{ backgroundColor: "#fff3cd", color: "#856404" }}
              >
                Lunch Start
              </Table.Th>
              <Table.Th
                style={{ backgroundColor: "#fff3cd", color: "#856404" }}
              >
                Lunch End
              </Table.Th>
              <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
                Second Break Start
              </Table.Th>
              <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
                Second Break End
              </Table.Th>
              <Table.Th
                style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
              >
                Clock Out
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td colSpan={9}>
                <Text ta="center" c="dimmed">
                  No time entries found for the selected period.
                </Text>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea h={400}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th style={{ backgroundColor: "#e6f4ea", color: "#1e4620" }}>
              Clock In
            </Table.Th>
            <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
              First Break Start
            </Table.Th>
            <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
              First Break End
            </Table.Th>
            <Table.Th style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
              Lunch Start
            </Table.Th>
            <Table.Th style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
              Lunch End
            </Table.Th>
            <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
              Second Break Start
            </Table.Th>
            <Table.Th style={{ backgroundColor: "#424242", color: "white" }}>
              Second Break End
            </Table.Th>
            <Table.Th style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>
              Clock Out
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {shifts.map((shift) => (
            <Table.Tr key={shift.id}>
              <Table.Td>{format(shift.date, "MMM dd, yyyy")}</Table.Td>
              <Table.Td>
                {shift.clockInTime ? format(shift.clockInTime, "hh:mm a") : "-"}
              </Table.Td>
              <Table.Td>
                {shift.firstBreakStartTime
                  ? format(shift.firstBreakStartTime, "hh:mm a")
                  : "-"}
              </Table.Td>
              <Table.Td>
                {shift.firstBreakEndTime
                  ? format(shift.firstBreakEndTime, "hh:mm a")
                  : "-"}
              </Table.Td>
              <Table.Td>
                {shift.lunchStartTime
                  ? format(shift.lunchStartTime, "hh:mm a")
                  : "-"}
              </Table.Td>
              <Table.Td>
                {shift.lunchEndTime
                  ? format(shift.lunchEndTime, "hh:mm a")
                  : "-"}
              </Table.Td>
              <Table.Td>
                {shift.secondBreakStartTime
                  ? format(shift.secondBreakStartTime, "hh:mm a")
                  : "-"}
              </Table.Td>
              <Table.Td>
                {shift.secondBreakEndTime
                  ? format(shift.secondBreakEndTime, "hh:mm a")
                  : "-"}
              </Table.Td>
              <Table.Td>
                {shift.clockOutTime
                  ? format(shift.clockOutTime, "hh:mm a")
                  : "-"}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default AdminTimeEntriesTable;
