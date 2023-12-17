import { rtdata } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Badge, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import StatusBadge from "../components/StatusBadge";

export interface RtdataQuery {
  status: string;
  group: string;
  search: string;
  orderBy: keyof rtdata;
  type: "asc" | "desc";
}

interface Props {
  searchParams: RtdataQuery;
  rtdata: rtdata[];
}
export const columns: {
  label: string;
  value: keyof rtdata;
  className?: string;
}[] = [
  {
    label: "站号",
    value: "rtu_address",
  },
  { label: "用汽单位", value: "user_name", className: "hidden md:table-cell" },
  {
    label: "温度(°C)",
    value: "temp",
    className: "hidden md:table-cell",
  },
  {
    label: "压力(MPa)",
    value: "press",
    className: "hidden md:table-cell",
  },
  {
    label: "流量(t/h)",
    value: "flow_m",
  },
  {
    label: "当日用量(T)",
    value: "flow_m_day",
    className: "hidden md:table-cell",
  },
  {
    label: "时间",
    value: "time",
    className: "hidden md:table-cell",
  },
  {
    label: "报警提示",
    value: "alarmdes",
    className: "hidden md:table-cell",
  },
];

const RtdataTable = ({ searchParams, rtdata }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    type:
                      searchParams.orderBy === column.value &&
                      searchParams.type === "desc"
                        ? "asc"
                        : "desc",
                  },
                }}
              >
                {column.label}
              </Link>
              {column.value === searchParams.orderBy &&
                (searchParams.type === "asc" ? (
                  <ArrowUpIcon className="inline" />
                ) : (
                  <ArrowDownIcon className="inline" />
                ))}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rtdata.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>
              <div className="hidden md:table-cell">{row.rtu_address}</div>
              <div className="block md:hidden mb-1">
                <Text size={"3"}>{row.user_name}</Text>
              </div>

              {
                <div className="flex md:hidden gap-1">
                  {row.rtu_address}
                  <StatusBadge label={row.alarmdes} status={row.comm_status} />
                </div>
              }
              {
                <div className="block md:hidden mt-1">
                  <Text size={"1"} color="gray">
                    {row.time?.toLocaleString("zh-CN", { timeZone: "UTC" })}
                  </Text>
                </div>
              }
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.user_name}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">{row.temp}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.press}
            </Table.Cell>
            <Table.Cell>
              {
                <div>
                  <div className="hidden md:table-cell">{row.flow_m}</div>
                  <div className="block md:hidden mb-1">
                    <Text size={"3"}>{row.flow_m}</Text>
                  </div>
                  <div className="block md:hidden">
                    <Text size={"1"} color="gray">
                      {"当日用量(T): "}
                    </Text>
                    {row.flow_m_day}
                  </div>
                  <div className="block md:hidden">
                    <Text size={"1"} color="gray">
                      {"温度(°C): "}
                    </Text>
                    {row.temp}
                  </div>
                  <div className="block md:hidden">
                    <Text size={"1"} color="gray">
                      {"压力(MPa): "}
                    </Text>
                    {row.press}
                  </div>
                </div>
              }
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.flow_m_day}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Text color="gray">
                {row.time?.toLocaleString("zh-CN", { timeZone: "UTC" })}
              </Text>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <StatusBadge label={row.alarmdes} status={row.comm_status} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default RtdataTable;
