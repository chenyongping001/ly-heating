"use client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: { value: string; label: string }[] = [
  { value: "ALL", label: "全部" },
  { value: "0", label: "正常" },
  { value: "1", label: "故障或停用" },
  { value: "2", label: "其他" },
];
const StatusFilter = () => {
  const router = useRouter();
  return (
    <div>
      <Select.Root
        defaultValue="ALL"
        onValueChange={(status) => {
          const searchParams = `?status=${status}`;
          router.push("/rtdata" + searchParams);
        }}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>站点状态</Select.Label>
            <Select.Separator />
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default StatusFilter;