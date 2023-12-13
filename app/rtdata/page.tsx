import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "../components/StatusBadge";

const Rtdatapage = async () => {
  const rtdata = await prisma.rtdata.findMany();
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            站号
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>用汽单位</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            温度(°C)
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            压力(MPa)
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>瞬时流量(t/h)</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            当日用量(T)
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            时间
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            报警提示
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rtdata.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell className="hidden md:table-cell">
              {row.rtu_address}
            </Table.Cell>
            <Table.Cell>
              {row.user_name}
              {
                <div className="block md:hidden">
                  <StatusBadge label={row.alarmdes} status={row.comm_status} />
                </div>
              }
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">{row.temp}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.press}
            </Table.Cell>
            <Table.Cell>{row.flow_m}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.flow_m_day}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {row.time?.toLocaleString()}
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

export default Rtdatapage;