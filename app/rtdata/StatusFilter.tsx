"use client";
import { ChevronDownIcon, EnterIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";

import React from "react";

const statuses: { value: string; label: string }[] = [
  { value: "ALL", label: "全部" },
  { value: "0", label: "正常" },
  { value: "1", label: "故障或停用" },
  { value: "2", label: "其他" },
];
const StatusFilter = () => {
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            站点状态过滤
            <ChevronDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {statuses.map((status) => (
            <DropdownMenu.Item key={status.value} textValue={status.value}>
              {status.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default StatusFilter;
