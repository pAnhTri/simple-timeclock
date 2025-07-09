import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, ReactNode } from "react";
import { LuCircleAlert } from "react-icons/lu";
import { Alert as MantineAlert } from "@mantine/core";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  iconSize?: number;
  title: string;
  variant?: string;
}

const Alert = ({
  children,
  iconSize = 16,
  title,
  variant = "default",
  className,
  ...props
}: AlertProps) => {
  const variantClass = {
    default: "",
    "full-screen": "full-screen-container justify-center items-center",
  };

  return (
    <div
      className={cn(
        variantClass[variant as keyof typeof variantClass],
        className
      )}
      {...props}
    >
      <MantineAlert
        title={title}
        color="red"
        variant="filled"
        icon={<LuCircleAlert size={iconSize} />}
      >
        {children}
      </MantineAlert>
    </div>
  );
};

export default Alert;
