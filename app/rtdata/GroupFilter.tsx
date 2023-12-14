"use client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const groupes: { value: string; label: string }[] = [
  { value: "ALL", label: "全部" },
  { value: "1", label: "热网总线" },
  { value: "2", label: "其他" },
];
const GroupFilter = () => {
  const router = useRouter();
  return (
    <div>
      <Select.Root
        defaultValue="ALL"
        onValueChange={(group) => {
          const searchParams = `?group=${group}`;
          router.push("/rtdata" + searchParams);
        }}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>管线类别</Select.Label>
            <Select.Separator />
            {groupes.map((group) => (
              <Select.Item key={group.value} value={group.value}>
                {group.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default GroupFilter;
