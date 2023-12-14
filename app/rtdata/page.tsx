import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import RtdataAction from "./RtdataAction";
import RtdataTable, { RtdataQuery, columns } from "./RtdataTable";
import RtdataSummary from "./RtdataSummary";
import { Metadata } from "next";

interface Props {
  searchParams: RtdataQuery;
}

const Rtdatapage = async ({ searchParams }: Props) => {
  const { status = "ALL", group = "ALL" } = searchParams;
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const where = {
    rtu_address: { lt: 600 },
    user_type: { equals: 1 },
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
  };
  const rtdata = await prisma.rtdata.findMany({
    where,
    orderBy: columns
      .map((column) => column.value)
      .includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: searchParams.type }
      : undefined,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const whereTotalUser = {
    rtu_address: { lt: 600 },
    user_type: { equals: 1 },
  };

  const rtFlowSum = await prisma.rtdata.aggregate({
    where: whereTotalUser,
    _sum: { flow_m: true },
  });
  const accumulationDaySum = await prisma.rtdata.aggregate({
    where: whereTotalUser,
    _sum: { flow_m_day: true },
  });

  const rtdataCount = await prisma.rtdata.count({ where });

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
      <Pagination
        currentPage={page}
        itemCount={rtdataCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "热网实时数据",
  description: "监视热网实时数据",
};
export default Rtdatapage;
