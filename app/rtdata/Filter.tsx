"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

export interface filterItem {
  value: string;
  label: string;
}
interface Props {
  filterItems: filterItem[];
  filterName: string;
  defaultValue: string;
  showLabel: string;
}
const Filter = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  return (
    <Select.Root
      defaultValue={params.get(props.filterName) || props.defaultValue}
      onValueChange={(filterName) => {
        params.set(props.filterName, filterName);
        router.push("/rtdata?" + params.toString());
      }}
    >
      <Select.Trigger radius="large" />
      <Select.Content>
        <Select.Group>
          <Select.Label>{props.showLabel}</Select.Label>
          <Select.Separator />
          {props.filterItems.map((filterItem) => (
            <Select.Item key={filterItem.value} value={filterItem.value}>
              {filterItem.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default Filter;
