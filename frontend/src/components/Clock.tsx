import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useState } from "react";

interface ClockProps extends HTMLAttributes<HTMLDivElement> {
  currentTime: string;
}

const Clock = ({ className, currentTime, ...props }: ClockProps) => {
  return (
    <div className={cn("text-2xl font-bold", className)} {...props}>
      {currentTime}
    </div>
  );
};

export default Clock;
