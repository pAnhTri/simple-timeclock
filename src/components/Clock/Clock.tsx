"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useState } from "react";

const Clock = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className={cn("text-2xl font-bold", className)} {...props}>
      {time.toLocaleTimeString()}
    </p>
  );
};

export default Clock;
