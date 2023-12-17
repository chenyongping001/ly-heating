"use client";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  return (
    <div>
      <TextField.Root radius="large" size={"3"}>
        <TextField.Input
          value={search}
          placeholder="搜索用汽单位名称或站号"
          onChange={(event) => setSearch(event.target.value.trim())}
        ></TextField.Input>
        <TextField.Slot>
          <Flex gap={"5"}>
            <Button
              variant="ghost"
              color="gray"
              size={"3"}
              onClick={() => {
                params.set("search", search);
                router.push("/rtdata/?" + params.toString());
              }}
            >
              搜索
            </Button>
            <Button
              variant="ghost"
              color="gray"
              size={"3"}
              onClick={() => {
                setSearch("");
                params.delete("search");
                router.push("/rtdata/?" + params.toString());
              }}
            >
              清空
            </Button>
          </Flex>
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
};

export default Search;
