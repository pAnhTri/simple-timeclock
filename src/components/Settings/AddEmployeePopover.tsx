"use client";

import { revalidate } from "@/lib/utils/actions";
import { useEmployeeCreater } from "@/lib/utils/hooks";
import {
  EmployeeCreationInput,
  employeeCreationValidator,
} from "@/lib/validators/employees";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  LoadingOverlay,
  PasswordInput,
  Popover,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Alert from "../Alert";
import { FiPlus } from "react-icons/fi";
import { Employee } from "prisma/generated/prisma";

const AddEmployeePopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createEmployee, isLoading, error } = useEmployeeCreater();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeCreationInput>({
    resolver: zodResolver(employeeCreationValidator),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<EmployeeCreationInput> = async (data) => {
    const sanitizedName = data.name.trim();

    const payload: Partial<Employee> = {
      name: sanitizedName,
      email: data.email,
      password: data.password,
    };

    await createEmployee(payload);
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

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                label="Employee Email"
                placeholder="Enter employee email"
                {...field}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                label="Employee Password"
                placeholder="Enter employee password"
                {...field}
                error={errors.password?.message}
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
