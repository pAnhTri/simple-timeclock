"use client";

import { useEmployee } from "@/lib/utils/hooks";
import { useAuthStore } from "@/lib/zustand";
import { Group, Loader, Skeleton, Text, Title } from "@mantine/core";
import Alert from "./Alert";

const Employee = () => {
  const payload = useAuthStore((state) => state.payload);
  const { employee, isLoading, isValidating, error } = useEmployee(
    payload?.id as string,
    true
  );

  if (isLoading) {
    return <Skeleton height={40} width="100%" />;
  }

  if (error) {
    return (
      <Alert color="red" title="Error">
        <Text>{error}</Text>
      </Alert>
    );
  }

  return (
    <Group justify="center" align="center" gap="md">
      <Title order={2} className="text-lg md:text-2xl text-center">
        {employee?.name}
      </Title>
      {isValidating && <Loader size="xl" />}
    </Group>
  );
};

export default Employee;
