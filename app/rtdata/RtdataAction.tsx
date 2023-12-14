import React from "react";
import StatusFilter from "./StatusFilter";
import GroupFilter from "./GroupFilter";
import { Flex } from "@radix-ui/themes";

const RtdataAction = () => {
  return (
    <Flex className="mb-2" gap={"3"}>
      <StatusFilter />
      <GroupFilter />
    </Flex>
  );
};

export default RtdataAction;
