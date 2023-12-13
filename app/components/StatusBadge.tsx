import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: number;
  label: string;
}
const statusMap: { status: number; color: "red" | "green" | "violet" }[] = [
  { status: 0, color: "green" },
  { status: 1, color: "red" },
  { status: 2, color: "violet" },
];
const StatusBadge = ({ status, label }: Props) => {
  return (
    <Badge
      color={
        statusMap.find((item) => item.status === status)?.color || "violet"
      }
    >
      {label}
    </Badge>
  );
};

export default StatusBadge;
