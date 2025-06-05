"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import type { Employee } from "@/lib/mongodb/models/Employee";
import type { TimeLog } from "@/lib/mongodb/models/TimeLog";
import { cn } from "@/lib/util/cn";
import ClockForm from "./Clock-Form";
import CurrentTime from "./Clock-CurrentTime";
import ClockLog from "./Clock-Log";
import useTimeLogStore from "@/lib/zustand/timelog";
import useEmployeeStore from "@/lib/zustand/employee";
import axios from "axios";
import OpenFileButton from "./Clock-OpenFileButton";

interface ClockMainProps extends HTMLAttributes<HTMLDivElement> {
  employees: Employee[];
  timeLogs: TimeLog[];
}

const ClockMain = ({
  employees,
  timeLogs,
  className,
  ...props
}: ClockMainProps) => {
  const [isFlaskConnected, setIsFlaskConnected] = useState(false);

  const setTimeLogs = useTimeLogStore((state) => state.setTimeLogs);
  const setEmployees = useEmployeeStore((state) => state.setEmployees);

  useEffect(() => {
    setTimeLogs(timeLogs);
    setEmployees(employees);

    // Fetch "/" from flask server
    axios
      .get("/api/flask/connect")
      .then((res) => {
        setIsFlaskConnected(res.data.success);
      })
      .catch(() => {
        setIsFlaskConnected(false);
      });
  }, [timeLogs, employees]);

  return (
    <main className={cn("m-auto", className)} {...props}>
      <CurrentTime className="mb-4" />
      <ClockForm />

      {/* Clock in/out log of today */}
      <ClockLog />

      {/* Open File Button */}
      {isFlaskConnected && <OpenFileButton className="mt-4" />}
    </main>
  );
};

export default ClockMain;
