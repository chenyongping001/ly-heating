'use server'
import prisma from "@/prisma/client";
import { convertDateToString, keep2Dec } from "@/utilite";

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



export async function getRtSummaryData() {
    let rtFlowSum, accumulationDaySum, accumulationYesterday, rtFlowPeakYesterday, rtFlowPeakToday;
    try {
        rtFlowSum = await prisma.rtdata.aggregate({
            where: whereTotalUser,
            _sum: { flow_m: true },
        });
        accumulationDaySum = await prisma.rtdata.aggregate({
            where: whereTotalUser,
            _sum: { flow_m_day: true },
        });
        accumulationYesterday = await prisma.rtdata.aggregate({
            where: whereTotalUser,
            _sum: { Month_Use: true },
        });
        rtFlowPeakYesterday = await prisma.chanelLost.groupBy({
            by: ["update_time"],
            where: {
                update_time: yesterday,
            },
            _sum: { useTotal: true },
            orderBy: { _sum: { useTotal: "desc" } },
            take: 1,
        });
        rtFlowPeakToday = await prisma.chanelLost.groupBy({
            by: ["update_time"],
            where: {
                update_time: today,
            },
            _sum: { useTotal: true },
            orderBy: { _sum: { useTotal: "desc" } },
            take: 1,
        });
    } catch (error) {
        return null;
    }
    return {
        rtFlowReal: keep2Dec(rtFlowSum._sum.flow_m!),
        rtFlowPeakToday: keep2Dec(rtFlowPeakToday[0]._sum.useTotal!),
        rtFlowPeakTodayAt: convertDateToString(rtFlowPeakToday[0].update_time),
        rtFlowPeakYesterday: keep2Dec(rtFlowPeakYesterday[0]._sum.useTotal!),
        rtFlowPeakYesterdayAt: convertDateToString(rtFlowPeakYesterday[0].update_time),
        accumulationDay: keep2Dec(accumulationDaySum._sum.flow_m_day!),
        accumulationYesterday: keep2Dec(accumulationYesterday._sum.Month_Use!)
    }
}

export async function getRtTableData(where:any,orderBy:any) {
    let rtdatas;
    try {
        rtdatas = await prisma.rtdata.findMany({
          where,
          orderBy,
        })
        
    } catch (error) {
        return null;
    }
    return rtdatas;
    
}