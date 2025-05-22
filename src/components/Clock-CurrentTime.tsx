import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/util/cn";

const CurrentTime = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time on client-side only
    setCurrentTime(new Date());

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Don't render anything until we're on the client
  if (!currentTime) {
    return null;
  }

  return (
    <div className={cn("text-center", className)} {...props}>
      <h1 className="text-2xl font-bold">{currentTime.toLocaleTimeString()}</h1>
    </div>
  );
};

export default CurrentTime;
