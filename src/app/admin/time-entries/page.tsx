"use client";

import { useState, useEffect } from "react";
import { Affix, Button, Group, Stack, Text, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import {
  format,
  startOfWeek,
  endOfWeek,
  parseISO,
  startOfDay,
  endOfDay,
} from "date-fns";
import { getEmployees } from "@/lib/utils/actions";
import { getEmployeeShiftsByDateRange } from "@/lib/utils/actions/shifts";
import { Employee, Shift } from "prisma/generated/prisma";
import AdminTimeEntriesTable from "@/components/AdminTimeEntriesTable";
import Alert from "@/components/Alert";

const AdminTimeEntriesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(
    startOfWeek(new Date())
  );
  const [endDate, setEndDate] = useState<Date | null>(endOfWeek(new Date()));
  const [shifts, setShifts] = useState<Shift[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load employees on component mount
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const { employees, error } = await getEmployees();
        if (error) {
          setError(error);
        } else {
          setEmployees(employees);
        }
      } catch (err) {
        setError("Failed to load employees");
      }
    };

    loadEmployees();
  }, []);

  // Load shifts when employee or date range changes
  useEffect(() => {
    const loadShifts = async () => {
      if (!selectedEmployee || !startDate || !endDate) {
        setShifts([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { shifts, error } = await getEmployeeShiftsByDateRange(
          selectedEmployee,
          startDate,
          endDate
        );

        if (error) {
          setError(error);
        } else {
          setShifts(shifts);
        }
      } catch (err) {
        setError("Failed to load time entries");
      } finally {
        setIsLoading(false);
      }
    };

    loadShifts();
  }, [selectedEmployee, startDate, endDate]);

  const selectedEmployeeData = employees.find(
    (emp) => emp.id === selectedEmployee
  );

  if (error && !employees.length) {
    return (
      <Alert
        title="Error: Loading Employees"
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
          href="/settings"
          color="gray"
          size="lg"
          variant="subtle"
        >
          <FiArrowLeft size={20} />
        </Button>
      </Affix>

      <div className="full-screen-container items-center p-8">
        <Stack gap="lg" w="100%" maw={1200}>
          <Text component="h1" className="text-2xl font-bold">
            Admin Time Entries
          </Text>

          {error && (
            <Alert color="red" title="Error">
              <Text>{error}</Text>
            </Alert>
          )}

          <Group gap="md" align="end">
            <Select
              label="Select Employee"
              placeholder="Choose an employee"
              data={employees.map((emp) => ({
                value: emp.id,
                label: emp.name,
              }))}
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              style={{ minWidth: 200 }}
            />

            <DatePickerInput
              label="Start Date"
              placeholder="Pick start date"
              value={startDate}
              onChange={(value) => {
                if (value) {
                  // Parse the date string and convert to start of day in user's timezone
                  const parsedDate = parseISO(value);
                  const startOfDayDate = startOfDay(parsedDate);
                  setStartDate(startOfDayDate);
                } else {
                  setStartDate(null);
                }
              }}
              style={{ minWidth: 150 }}
            />

            <DatePickerInput
              label="End Date"
              placeholder="Pick end date"
              value={endDate}
              onChange={(value) => {
                if (value) {
                  // Parse the date string and convert to end of day in user's timezone
                  const parsedDate = parseISO(value);
                  const endOfDayDate = endOfDay(parsedDate);
                  setEndDate(endOfDayDate);
                } else {
                  setEndDate(null);
                }
              }}
              style={{ minWidth: 150 }}
            />
          </Group>

          {selectedEmployeeData && (
            <Text size="lg" fw={500}>
              Time Entries for:{" "}
              <span className="text-blue-600">{selectedEmployeeData.name}</span>
              {startDate && endDate && (
                <span className="text-gray-600 ml-2">
                  ({format(startDate, "MMM dd")} -{" "}
                  {format(endDate, "MMM dd, yyyy")})
                </span>
              )}
            </Text>
          )}

          <AdminTimeEntriesTable shifts={shifts} isLoading={isLoading} />
        </Stack>
      </div>
    </>
  );
};

export default AdminTimeEntriesPage;
