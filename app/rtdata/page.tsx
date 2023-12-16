import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import RtdataAction from "./RtdataAction";
import RtdataSummary from "./RtdataSummary";
import RtdataTable, { RtdataQuery, columns } from "./RtdataTable";

interface Props {
  searchParams: RtdataQuery;
}

const Rtdatapage = async ({ searchParams }: Props) => {
  if (!/wxwork/i.test(JSON.stringify(searchParams)))
    return <p>不支持当前环境！</p>;

  const { status = "ALL", group = "ALL", search = "" } = searchParams;
  const where = {
    rtu_address: { lt: 600 },
    comm_status:
      status === "ALL"
        ? { gte: 0 }
        : parseInt(status) < 2
        ? { equals: parseInt(status) }
        : { gte: 2 },
    group_id:
      group === "ALL"
        ? { gte: 0 }
        : parseInt(group) < 2
        ? { equals: parseInt(group) }
        : { gte: 2 },
    OR: [
      /^\d+$/.test(search)
        ? {
            rtu_address: { equals: parseInt(search) },
          }
        : {},
      {
        user_name: { contains: search },
      },
    ],
  };

  const whereTotalUser = {
    rtu_address: { lt: 600 },
    user_type: { equals: 1 },
  };
  try {
    const rtdata = await prisma.rtdata.findMany({
      where,
      orderBy: columns
        .map((column) => column.value)
        .includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: searchParams.type }
        : undefined,
    });
    const rtFlowSum = await prisma.rtdata.aggregate({
      where: whereTotalUser,
      _sum: { flow_m: true },
    });
    const accumulationDaySum = await prisma.rtdata.aggregate({
      where: whereTotalUser,
      _sum: { flow_m_day: true },
    });

    return (
      <Flex direction={"column"} gap={"3"}>
        <RtdataSummary
          rtFlowRate={Math.round(rtFlowSum._sum.flow_m! * 100) / 100}
          accumulationDay={
            Math.round(accumulationDaySum._sum.flow_m_day! * 100) / 100
          }
        />
        <RtdataAction />
        <RtdataTable rtdata={rtdata} searchParams={searchParams} />
      </Flex>
    );
  } catch (error) {
    return <Link href={"/rtdata"}>重试</Link>;
  }
};

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "热网实时数据",
  description: "监视热网实时数据",
};
export default Rtdatapage;
