import { rtdata } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Copyright from "../components/Copyright";
import RtdataAction from "./RtdataAction";
import RtdataSummary from "./RtdataSummary";
import RtdataTable from "./RtdataTable";
import { columns } from "./columns";

interface Props {
  searchParams: RtdataQuery;
}
export interface RtdataQuery {
  status: string;
  group: string;
  search: string;
  orderBy: keyof rtdata;
  type: "asc" | "desc";
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

  return (
    <Flex direction={"column"} gap={"2"}>
      <RtdataSummary />
      <RtdataAction />
      <RtdataTable
        searchParams={searchParams}
        where={where}
        orderBy={orderBy}
      />
      <Copyright />
    </Flex>
  );
};

// export const dynamic = "force-dynamic";
// export const metadata: Metadata = {
//   title: "热网实时数据",
//   description: "监视热网实时数据",
// };
export default Rtdatapage;
