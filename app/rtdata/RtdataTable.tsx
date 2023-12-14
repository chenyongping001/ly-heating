import { rtdata } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Badge, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import StatusBadge from "../components/StatusBadge";

export interface RtdataQuery {
  status: string;
  group: string;
  orderBy: keyof rtdata;
  type: "asc" | "desc";
  page: string;
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
    className: "hidden md:table-cell",
  },
  { label: "用汽单位", value: "user_name" },
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
            <Table.Cell className="hidden md:table-cell">
              {row.rtu_address}
            </Table.Cell>
            <Table.Cell>
              <div className="hidden md:table-cell">{row.user_name}</div>
              <div className="block md:hidden">
                <Badge>
                  <Text size={"3"}>{row.user_name}</Text>
                </Badge>
              </div>

              {
                <div className="flex md:hidden">
                  <StatusBadge label={row.alarmdes} status={row.comm_status} />
                </div>
              }
              {
                <div className="block md:hidden">
                  <Badge color="gray">
                    {row.time?.toLocaleString("zh-CN", { timeZone: "UTC" })}
                  </Badge>
                </div>
              }
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">{row.temp}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.press}
            </Table.Cell>
            <Table.Cell>
              {
                <div>
                  <div className="hidden md:table-cell">{row.flow_m}</div>
                  <div className="block md:hidden">
                    <Badge variant="outline">
                      <Text size={"3"}>{row.flow_m}</Text>
                    </Badge>
                  </div>
                  <div className="block md:hidden">
                    <Badge>
                      {"当日用量(T): "}
                      {row.flow_m_day}
                    </Badge>
                  </div>
                  <div className="block md:hidden">
                    <Badge>
                      {"温度(°C): "}
                      {row.temp}
                    </Badge>
                  </div>
                  <div className="block md:hidden">
                    <Badge>
                      {"压力(MPa): "}
                      {row.press}
                    </Badge>
                  </div>
                </div>
              }
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.flow_m_day}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Badge color="gray">
                {row.time?.toLocaleString("zh-CN", { timeZone: "UTC" })}
              </Badge>
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
