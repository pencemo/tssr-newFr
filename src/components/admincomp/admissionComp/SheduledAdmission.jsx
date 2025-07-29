import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVerticalIcon,
} from "lucide-react";
import Loader from "@/components/ui/loader";

import { TableList } from "./TableList";
import { useOpenAdmissinList, useScheduledAdmissinList } from "@/hooks/tanstackHooks/useAdmission";
import { CustomDialog } from "./EditModel";
import Pagination from "@/components/ui/Pagination";

export function SheduledAdmission() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [batchs, setBatches] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to page 1 on new search
    }, 1000); // delay in ms

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, error, isLoading } = useScheduledAdmissinList(currentPage, debouncedSearch);

  

  useEffect(() => {
    if (data && data.data) {
      setBatches(data.data);
    }
    if (data) {
      setTotalPage(data.totalPage);
    }
  }, [data]);

  const handleEdit = (rowData) => {
    setSelectedRow(rowData)
    setIsModalOpen(true)
  }
  if (error) {
    return <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
    Error to fetch data
  </div>;
  }

  return (
    <div className=" w-full h-full mt-6">
      <div className="space-y-6 w-full h-full">
        <div className="flex max-sm:flex-col gap-2 justify-between items-center">
          <div className="max-sm:w-full flex items-center justify-center gap-2">
            <h1 className="text-xl font-semibold ">Scheduled Admission</h1>
          </div>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            type="text"
            placeholder="Search users..."
            className="max-w-sm max-sm:max-w-full"
          />
        </div>

        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : batchs.length > 0 ?
          <div className="rounded-md border">
            <TableList
              model='scheduled'
              data={batchs}
              onEdit={handleEdit}
            />
            <CustomDialog 
             isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             data={selectedRow}
             schedul
             />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
          </div>:
          <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
          No data found
        </div>
          }
      </div>
    </div>
  );
}

export default SheduledAdmission
