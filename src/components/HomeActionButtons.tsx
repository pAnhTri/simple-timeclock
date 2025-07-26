"use client";

import { ActionIcon, Affix, Button, Group } from "@mantine/core";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";
import { useAuthStore } from "@/lib/zustand";
import OpenExcel from "./OpenExcel";
import { useLogout } from "@/lib/utils/hooks";

interface HomeActionButtonsProps {
  isConnected: boolean;
}

const HomeActionButtons = ({ isConnected }: HomeActionButtonsProps) => {
  const payload = useAuthStore((state) => state.payload);
  const { logoutAction, isLoading } = useLogout();

  return (
    <Affix position={{ top: 20, right: 20 }}>
      <Group p="xs">
        {/* Logout Button */}
        <Button
          onClick={async () => await logoutAction()}
          loading={isLoading}
          color="red"
        >
          Logout
        </Button>
        {payload && (payload.role as string).toLowerCase() === "admin" && (
          <ActionIcon
            component={Link}
            href="/settings"
            color="gray"
            size="lg"
            variant="subtle"
          >
            <FaGear />
          </ActionIcon>
        )}
        {isConnected && <OpenExcel />}
      </Group>
    </Affix>
  );
};

export default HomeActionButtons;
