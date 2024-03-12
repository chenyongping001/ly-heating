import { rtdata } from "@prisma/client";

export const columns: {
  label: string;
  value: keyof rtdata;
  className?: string;
}[] = [
  {
    label: "站号",
    value: "rtu_address",
  },
  { label: "用汽单位", value: "user_name", className: "hidden md:table-cell" },
  {
    label: "温度(°C)",
    value: "temp",
    className: "hidden md:table-cell",
  },
  {
    label: "压力(MPa)",
    value: "press",
    className: "hidden md:table-cell",
  },
  {
    label: "频率(Hz)",
    value: "dpress",
    className: "hidden md:table-cell",
  },
  {
    label: "流量(t/h)",
    value: "flow_m",
  },
  {
    label: "当日用量(T)",
    value: "flow_m_day",
    className: "hidden md:table-cell",
  },
  {
    label: "昨日用量(T)",
    value: "Month_Use",
    className: "hidden md:table-cell",
  },
  {
    label: "时间",
    value: "time",
    className: "hidden md:table-cell",
  },
  {
    label: "报警提示",
    value: "alarmdes",
    className: "hidden md:table-cell",
  },
];