import Filter, { filterItem } from "./Filter";

const groupes: filterItem[] = [
  { value: "ALL", label: "全部" },
  { value: "1", label: "热网总线" },
  { value: "2", label: "其他" },
];
const GroupFilter = () => {
  return (
    <Filter
      filterItems={groupes}
      defaultValue="ALL"
      showLabel="管线类别"
      filterName="group"
    />
  );
};

export default GroupFilter;
