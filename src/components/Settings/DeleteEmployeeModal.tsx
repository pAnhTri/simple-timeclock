"use client";

import { useEmployeeDeleter } from "@/lib/utils/hooks";
import { Button, Group, LoadingOverlay, Modal, Text } from "@mantine/core";
import { Employee } from "prisma/generated/prisma";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import Alert from "../Alert";
import { revalidate } from "@/lib/utils/actions";

interface DeleteEmployeeModalProps {
  employee: Employee;
}

const DeleteEmployeeModal = ({ employee }: DeleteEmployeeModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteEmployee, isLoading, error } = useEmployeeDeleter();

  const handleDelete = async () => {
    await deleteEmployee(employee);
    setIsModalOpen(false);
    revalidate("/settings");
  };

  return (
    <>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Employee"
        pos="relative"
      >
        <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />
        {error && (
          <Alert title="Error: Deleting Employee" iconSize={100}>
            {error}
          </Alert>
        )}
        <Text>
          Are you sure you want to delete{" "}
          <Text component="span" c="red">
            {employee.name}
          </Text>
          ? This action cannot be undone.
        </Text>
        <Group justify="flex-end" gap="xs">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete} loading={isLoading}>
            Delete
          </Button>
        </Group>
      </Modal>

      {/* Toggle Button*/}
      <Button
        size="xs"
        variant="subtle"
        color="red"
        onClick={() => setIsModalOpen(true)}
      >
        <FiTrash size={16} />
      </Button>
    </>
  );
};

export default DeleteEmployeeModal;
