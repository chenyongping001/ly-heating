import Filter, { filterItem } from "./Filter";

const statuses: filterItem[] = [
  { value: "ALL", label: "全部" },
  { value: "0", label: "正常" },
  { value: "1", label: "故障或停用" },
  { value: "2", label: "其他" },
];
const StatusFilter = () => {
  return (
    <Filter
      filterItems={statuses}
      defaultValue="ALL"
      showLabel="站点状态"
      filterName="status"
    />
  );
};

export default StatusFilter;
