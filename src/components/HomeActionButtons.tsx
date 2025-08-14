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
      <Group p="xs" gap="xs">
        {/* Logout Button */}
        <Button
          onClick={async () => await logoutAction()}
          loading={isLoading}
          color="red"
          size="sm"
          className="text-xs md:text-sm"
        >
          Logout
        </Button>
        {payload && (payload.role as string).toLowerCase() === "admin" && (
          <ActionIcon
            component={Link}
            href="/settings"
            color="gray"
            size="md"
            variant="subtle"
          >
            <FaGear />
          </ActionIcon>
        )}
        {/* OpenExcel Button - Hidden on mobile */}
        {isConnected && (
          <div className="hidden md:block">
            <OpenExcel />
          </div>
        )}
      </Group>
    </Affix>
  );
};

export default HomeActionButtons;
