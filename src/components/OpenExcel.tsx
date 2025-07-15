"use client";

import { useExcelOpener } from "@/lib/utils/hooks/useExcelOpener";
import { Button } from "@mantine/core";

const OpenExcel = () => {
  const { isLoading, openExcel } = useExcelOpener();

  return (
    <Button onClick={openExcel} loading={isLoading}>
      Open Excel
    </Button>
  );
};

export default OpenExcel;
