"use client";

import {
  EmployeeNameEditInput,
  employeeNameEditValidator,
} from "@/lib/validators";
import { Button, Group, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { Employee } from "prisma/generated/prisma";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEmployeeNameUpdater } from "@/lib/utils/hooks/useEmployeeUpdater";
import Alert from "../Alert";
import { revalidate } from "@/lib/utils/actions";
import { FiEdit } from "react-icons/fi";

interface NameEditModalProps {
  employee: Employee;
}

const NameEditModal = ({ employee }: NameEditModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateEmployeeName, isLoading, error } = useEmployeeNameUpdater();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeNameEditInput>({
    resolver: zodResolver(employeeNameEditValidator),
    defaultValues: {
      name: employee.name,
    },
  });

  useEffect(() => {
    reset({
      name: employee.name,
    });
  }, [employee.name, reset]);

  const onSubmit: SubmitHandler<EmployeeNameEditInput> = async (data) => {
    const sanitizedName = data.name.trim();

    await updateEmployeeName(employee, sanitizedName);

    // Everything succeeds, close the modal
    handleClose();
    revalidate("/settings");
  };

  const handleClose = () => {
    reset();
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        opened={isModalOpen}
        onClose={handleClose}
        title="Edit Employee Name"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 relative"
        >
          <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />
          {error && (
            <Alert title="Error: Updating Employee Name" iconSize={100}>
              {error}
            </Alert>
          )}
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput
                data-autofocus
                {...field}
                label="Name"
                error={errors.name?.message}
                placeholder="Enter new name"
              />
            )}
          />
          <Group justify="flex-end" gap="xs">
            <Button type="submit" loading={isLoading}>
              Save
            </Button>
            <Button
              type="button"
              color="red"
              onClick={handleClose}
              variant="outline"
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>

      {/* Toggle Modal Button */}
      <Button size="xs" variant="subtle" onClick={() => setIsModalOpen(true)}>
        <FiEdit size={16} />
      </Button>
    </>
  );
};

export default NameEditModal;
