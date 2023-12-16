import { Box, Container, Flex, Text } from "@radix-ui/themes";
import React from "react";

const Copyright = () => {
  return (
    <Flex justify={"center"} pt={"5"} pb={"3"}>
      <Text size={"1"} color="gray">
        Copyright © 2023 chenyongping
      </Text>
    </Flex>
  );
};

export default Copyright;
