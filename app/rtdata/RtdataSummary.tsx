"use client";

import { Card, Flex, Grid, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getRtSummaryData } from "../actions";

const RtdataSummary = () => {
  const [rtFlowReal, setRtFlowReal] = useState(0);
  const [rtFlowPeakToday, setRtFlowPeakToday] = useState(0);
  const [rtFlowPeakTodayAt, setRtFlowPeakTodayAt] = useState("");
  const [rtFlowPeakYesterday, setRtFlowPeakYesterday] = useState(0);
  const [rtFlowPeakYesterdayAt, setRtFlowPeakYesterdayAt] = useState("");
  const [accumulationDay, setAccumulationDay] = useState(0);
  const [accumulationYesterday, setAccumulationYesterday] = useState(0);
  const [refreshToken, setRefreshToken] = useState(Math.random());

  useEffect(() => {
    getRtSummaryData()
      .then((res) => {
        if (!res) return;
        setRtFlowReal(res.rtFlowReal);
        setRtFlowPeakToday(res.rtFlowPeakToday);
        setRtFlowPeakTodayAt(res.rtFlowPeakTodayAt);
        setRtFlowPeakYesterday(res.rtFlowPeakYesterday);
        setRtFlowPeakYesterdayAt(res.rtFlowPeakYesterdayAt);
        setAccumulationDay(res.accumulationDay);
        setAccumulationYesterday(res.accumulationYesterday);
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setRefreshToken(Math.random()), 2000);
      });
  }, [refreshToken]);

  const containers: {
    label: string;
    value: number;
    occurTime?: string;
  }[] = [
    { label: "实时流量(t/h)", value: rtFlowReal },
    {
      label: "今日峰值(t/h)",
      value: rtFlowPeakToday,
      occurTime: rtFlowPeakTodayAt,
    },
    {
      label: "昨日峰值(t/h)",
      value: rtFlowPeakYesterday,
      occurTime: rtFlowPeakYesterdayAt,
    },
  ];
  return (
    <Flex direction={"column"} gap={"2"}>
      <Grid gap={"2"} columns={"3"}>
        {containers.map((container) => (
          <Card key={container.label} variant="surface">
            <Flex direction={"column"} gap="1">
              <Text className="text-xs font-medium">{container.label}</Text>
              <Text size="5" className="font-bold items-center">
                {container.value}
              </Text>
              <Text size={"1"} color="gray">
                {container.occurTime}
              </Text>
            </Flex>
          </Card>
        ))}
      </Grid>
      <Grid gap={"2"} columns={"2"}>
        <Card variant="surface">
          <Flex direction={"column"} gap="1">
            <Text className="text-xs font-medium">{"今日累积(T)"}</Text>
            <Text size="5" className="font-bold items-center">
              {accumulationDay}
            </Text>
          </Flex>
        </Card>
        <Card variant="surface">
          <Flex direction={"column"} gap="1">
            <Text className="text-xs font-medium">{"昨日总量(T)"}</Text>
            <Text size="5" className="font-bold items-center">
              {accumulationYesterday}
            </Text>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
};
export default RtdataSummary;
