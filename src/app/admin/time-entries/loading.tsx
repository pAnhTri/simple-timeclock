import { Loader, Stack, Text } from "@mantine/core";

export default function Loading() {
  return (
    <div className="full-screen-container items-center p-8">
      <Stack align="center" gap="md">
        <Loader size="xl" />
        <Text>Loading time entries...</Text>
      </Stack>
    </div>
  );
}
