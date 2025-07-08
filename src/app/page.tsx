import { Button } from "@mantine/core";
import { cn } from "@/lib/utils/cn";

export default function Page() {
  return (
    <div className={cn("flex flex-col justify-center items-center h-screen")}>
      <span>This is an example button:</span>
      <Button className={cn("bg-red-500")}>Click me</Button>
    </div>
  );
}
