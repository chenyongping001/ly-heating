import { Badge, Card, Flex, Grid, Text } from "@radix-ui/themes";
import StatusFilter from "./StatusFilter";
import GroupFilter from "./GroupFilter";
interface Props {
  rtFlowRate: number;
  accumulationDay: number;
}
const RtdataSummary = ({ rtFlowRate, accumulationDay }: Props) => {
  const containers: { label: string; value: number }[] = [
    { label: "实时流量(t/h)", value: rtFlowRate },
    { label: "日累积(T)", value: accumulationDay },
  ];
  return (
    <Grid gap={"3"} columns={"2"}>
      {containers.map((container) => (
        <Card>
          <Text size={"1"} color="gray">
            {container.label}
          </Text>
          <Badge variant="solid" ml={"2"}>
            <Text size={"4"} weight={"bold"}>
              {container.value}
            </Text>
          </Badge>
        </Card>
      ))}
    </Grid>
  );
};
export default RtdataSummary;
