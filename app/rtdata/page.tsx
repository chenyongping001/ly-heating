import prisma from "@/prisma/client";
import { Badge, Table, Text } from "@radix-ui/themes";
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
          <Table.ColumnHeaderCell>流量(t/h)</Table.ColumnHeaderCell>
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

export const dynamic = "force-dynamic";
export default Rtdatapage;
