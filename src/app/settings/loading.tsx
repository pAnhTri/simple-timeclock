import { Skeleton } from "@mantine/core";

const LoadingSkeleton = () => {
  return (
    <div className="full-screen-container items-center p-8">
      <Skeleton className="h-full w-full max-h-[600px] max-w-[1000px]" />
    </div>
  );
};

export default LoadingSkeleton;
