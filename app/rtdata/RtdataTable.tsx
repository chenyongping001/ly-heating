"use client";
import { rtdata } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import StatusBadge from "../components/StatusBadge";
import { useEffect, useState } from "react";
import { getRtTableData } from "../actions";
import { RtdataQuery } from "./page";
import { columns } from "./columns";

interface Props {
  searchParams: RtdataQuery;
  where: any;
  orderBy: any;
}

const RtdataTable = ({ searchParams, where, orderBy }: Props) => {
  const [rtdatas, setRtdatas] = useState<rtdata[]>([]);
  const [refreshToken, setRefreshToken] = useState(Math.random());
  useEffect(() => {
    getRtTableData(where, orderBy)
      .then((res) => {
        if (!res) return;
        setRtdatas(res);
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), 3000);
      });
  }, [refreshToken, where, orderBy]);

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
        {rtdatas.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>
              <div className="hidden md:table-cell">{row.rtu_address}</div>
              <div className="block md:hidden mb-1">
                <Text size={"3"}>{row.user_name}</Text>
              </div>
              <div className="flex md:hidden gap-1">
                {row.rtu_address}
                <StatusBadge label={row.alarmdes} status={row.comm_status} />
              </div>

              <div className="block md:hidden mt-1">
                <Text size={"1"} color="gray">
                  {"当日用量(T): "}
                </Text>
                {row.flow_m_day}
              </div>
              <div className="block md:hidden">
                <Text size={"1"} color="gray">
                  {"昨日用量(T): "}
                </Text>
                {row.Month_Use}
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.user_name}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">{row.temp}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.press}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.dpress}
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
                  <div className="block md:hidden">
                    <Text size={"1"} color="gray">
                      {"频率(Hz): "}
                    </Text>
                    {row.dpress}
                  </div>
                  <div className="block md:hidden mt-1">
                    <Text className="font-thin text-gray-400 text-xs">
                      {row.time?.toLocaleString("zh-CN", { timeZone: "UTC" })}
                    </Text>
                  </div>
                </div>
              }
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.flow_m_day}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.Month_Use}
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
