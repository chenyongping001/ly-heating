import { Flex, Grid } from "@radix-ui/themes";
import GroupFilter from "./GroupFilter";
import StatusFilter from "./StatusFilter";
import Search from "./Search";

const RtdataAction = () => {
  return (
    <Flex direction={"column"} gap={"3"}>
      <Grid gap={"3"} columns={"2"}>
        <StatusFilter />
        <GroupFilter />
      </Grid>
      <Search />
    </Flex>
  );
};

export default RtdataAction;
