import { Skeleton } from "@mantine/core";

const LoadingSkeleton = () => {
  return (
    <div className="full-screen-container justify-center items-center">
      <Skeleton className="min-h-[100px] min-w-[200px] h-full w-full max-h-1/2 max-w-1/2 md:h-[300px] md:w-[600px]" />
    </div>
  );
};

export default LoadingSkeleton;
