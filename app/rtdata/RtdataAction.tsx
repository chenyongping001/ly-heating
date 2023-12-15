import { Grid } from "@radix-ui/themes";
import GroupFilter from "./GroupFilter";
import StatusFilter from "./StatusFilter";

const RtdataAction = () => {
  return (
    <Grid gap={"3"} columns={"2"}>
      <StatusFilter />
      <GroupFilter />
    </Grid>
  );
};

export default RtdataAction;
