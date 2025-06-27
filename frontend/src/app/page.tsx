"use client";

import { Button, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { Employee as EmployeeType } from "@/lib/mongoDB/model/Employee";
import { getEmployees } from "@/lib/utils/api";
import EmployeeSelector from "@/components/EmployeeSelector";
import Clock from "@/components/Clock";
import { cn } from "@/lib/utils";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // DB Data
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  // User Inputs
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(
    null
  );

  // Time
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await getEmployees();
        setEmployees(employees);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleClockInOut = (): void => {
    console.log("Clock In/Out");
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader size={52} color="green" type="dots" />
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Clock
        currentTime={currentTime}
        className="text-4xl font-bold text-center mb-2"
      />
      <div className="border border-gray-400 rounded-md p-2">
        <EmployeeSelector
          employees={employees}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          className="mb-2"
          classNames={{
            label: "text-2xl font-bold p-2",
          }}
        />
        <Button
          fullWidth
          size="lg"
          disabled={!selectedEmployee}
          color={selectedEmployee?.isClockedIn ? "red" : "green"}
          classNames={{
            label: "text-2xl font-bold",
          }}
          onClick={handleClockInOut}
        >
          {selectedEmployee?.isClockedIn ? "Clock Out" : "Clock In"}
        </Button>
      </div>
    </div>
  );
};

export default Home;
