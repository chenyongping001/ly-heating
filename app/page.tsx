import Image from "next/image";
import StatusFilter from "./rtdata/StatusFilter";
import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination currentPage={5} itemCount={88} pageSize={10} />;
}
