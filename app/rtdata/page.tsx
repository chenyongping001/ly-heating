import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import RtdataAction from "./RtdataAction";
import RtdataSummary from "./RtdataSummary";
import RtdataTable, { RtdataQuery, columns } from "./RtdataTable";
import { convertDateToString } from "@/utilite";
import Link from "next/link";
import Copyright from "../components/Copyright";

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
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.type }
    : undefined;

  const whereTotalUser = {
    rtu_address: { lt: 600 },
    user_type: { equals: 1 },
  };

  const today = {
    gte: new Date(
      new Date(+new Date() + 8 * 3600 * 1000).setUTCHours(0, 0, 0, 0)
    ),
    lte: new Date(
      new Date(+new Date() + 8 * 3600 * 1000).setUTCHours(23, 59, 59, 999)
    ),
  };
  const yesterday = {
    gte: new Date(
      new Date(+new Date() - 16 * 3600 * 1000).setUTCHours(0, 0, 0, 0)
    ),
    lte: new Date(
      new Date(+new Date() - 16 * 3600 * 1000).setUTCHours(23, 59, 59, 999)
    ),
  };

  try {
    const rtdata = await prisma.rtdata.findMany({
      where,
      orderBy,
    });
    const rtFlowSum = await prisma.rtdata.aggregate({
      where: whereTotalUser,
      _sum: { flow_m: true },
    });
    const accumulationDaySum = await prisma.rtdata.aggregate({
      where: whereTotalUser,
      _sum: { flow_m_day: true },
    });

    const accumulationYesterday = await prisma.useDailyReport.aggregate({
      where: {
        ReportDate: {
          equals: new Date(+new Date() - 16 * 3600 * 1000)
            .toISOString()
            .substring(0, 10),
        },
      },
      _sum: { DailyFlow: true },
    });

    const rtFlowPeakYesterday = await prisma.chanelLost.groupBy({
      by: ["update_time"],
      where: {
        update_time: yesterday,
      },
      _sum: { useTotal: true },
      orderBy: { _sum: { useTotal: "desc" } },
      take: 1,
    });
    const rtFlowPeakToday = await prisma.chanelLost.groupBy({
      by: ["update_time"],
      where: {
        update_time: today,
      },
      _sum: { useTotal: true },
      orderBy: { _sum: { useTotal: "desc" } },
      take: 1,
    });

    return (
      <Flex direction={"column"} gap={"2"}>
        <RtdataSummary
          rtFlowReal={Math.round(rtFlowSum._sum.flow_m! * 100) / 100}
          rtFlowPeakToday={
            Math.round(rtFlowPeakToday[0]._sum.useTotal! * 100) / 100
          }
          rtFlowPeakTodayAt={convertDateToString(
            rtFlowPeakToday[0].update_time
          )}
          rtFlowPeakYesterday={
            Math.round(rtFlowPeakYesterday[0]._sum.useTotal! * 100) / 100
          }
          rtFlowPeakYesterdayAt={convertDateToString(
            rtFlowPeakYesterday[0].update_time
          )}
          accumulationDay={
            Math.round(accumulationDaySum._sum.flow_m_day! * 100) / 100
          }
          accumulationYesterday={
            Math.round(accumulationYesterday._sum.DailyFlow! * 100) / 100
          }
        />
        <RtdataAction />
        <RtdataTable rtdata={rtdata} searchParams={searchParams} />
        <Copyright />
      </Flex>
    );
  } catch (error) {
    return (
      <div>
        <p>发生了以下错误：</p>
        <p>{(error as Error).message}</p>
        <Link href={"/rtdata"}>重试</Link>
      </div>
    );
  }
};

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "热网实时数据",
  description: "监视热网实时数据",
};
export default Rtdatapage;
