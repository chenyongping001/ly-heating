import Image from "next/image";
import StatusFilter from "./rtdata/StatusFilter";
import Pagination from "./components/Pagination";
import RtdataSummary from "./rtdata/RtdataSummary";

export default function Home() {
  return <RtdataSummary rtFlowRate={340.5} accumulationDay={7789.09} />;
}
