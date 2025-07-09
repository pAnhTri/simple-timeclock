"use client";

import { revalidate } from "@/lib/utils/actions";
import { useEmployeeCreater } from "@/lib/utils/hooks";
import {
  EmployeeNameEditInput,
  employeeNameEditValidator,
} from "@/lib/validators/employees";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, LoadingOverlay, Popover, TextInput } from "@mantine/core";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Alert from "../Alert";
import { FiPlus } from "react-icons/fi";

const AddEmployeePopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createEmployee, isLoading, error } = useEmployeeCreater();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeNameEditInput>({
    resolver: zodResolver(employeeNameEditValidator),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<EmployeeNameEditInput> = async (data) => {
    const sanitizedName = data.name.trim();
    await createEmployee(sanitizedName);
    handleClose();
    revalidate("/settings");
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <Popover
      opened={isOpen}
      onDismiss={handleClose}
      trapFocus
      position="right"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Button
          onClick={() => setIsOpen(true)}
          color="green"
          variant="subtle"
          classNames={{
            root: "rounded-full p-2 size-10",
          }}
        >
          <FiPlus size={32} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 relative"
        >
          <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />
          {error && (
            <Alert title="Error: Adding Employee" iconSize={100}>
              {error}
            </Alert>
          )}
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput
                data-autofocus
                label="Employee Name"
                placeholder="Enter employee name"
                {...field}
                error={errors.name?.message}
              />
            )}
          />
          <Button color="green" type="submit" loading={isLoading}>
            Add Employee
          </Button>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};

export default AddEmployeePopover;
