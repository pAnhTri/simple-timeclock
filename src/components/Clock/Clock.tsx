"use client";

import { cn } from "@/lib/utils";
import { useEmployeeStore } from "@/lib/zustand";
import { HTMLAttributes, useEffect, useState } from "react";

const Clock = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  const [time, setTime] = useState(new Date());
  const hasWorkedEightHours = useEmployeeStore(
    (state) => state.hasWorkedEightHours
  );

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className={cn(
        "text-xl md:text-2xl font-bold",
        hasWorkedEightHours && "text-red-500",
        className
      )}
      {...props}
    >
      {time.toLocaleTimeString()}
    </p>
  );
};

export default Clock;
