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
import { TableComp } from "@/components/admincomp/studycenComp/Table";
import { useStudyCentre } from "@/hooks/tanstackHooks/useStudyCentre";
import { useNavigate } from "react-router-dom";
import { MenuButtons } from "@/components/admincomp/studycenComp/MenuButtons";
import { TableList } from "./TableList";
import { useChangeStatusAdmission, useOpenAdmissinList } from "@/hooks/tanstackHooks/useAdmission";
import { Alert } from "@/components/ui/Alert";
import { toast } from "sonner";

export function OpenADList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [batchs, setBatches] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {mutate}=useChangeStatusAdmission()

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

  const { data, error, isLoading } = useOpenAdmissinList(currentPage, debouncedSearch);

  

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

  const handleUpdateStatus = () => {
    const id = selectedRow?._id
    mutate(
      { id },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast("Batch updated", {
              description: "Batch updated successfully",
            });
            onClose()
          } else {
            toast("Somthing went wrong", {
              description: data.message,
            });
          }
        },
      }
    );
  };

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
            <h1 className="text-xl font-semibold ">Active Admission</h1>
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
              model={'open'}
              button='Change Status'
              data={batchs}
              onEdit={handleEdit}
            />
            <Alert deleteFn={handleUpdateStatus} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            <div className="flex items-center sm:justify-end justify-between space-x-2 py-4 px-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPage}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPage))
                }
                disabled={currentPage === totalPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPage)}
                disabled={currentPage === totalPage}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>:
          <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
          No data found
        </div>
          }
      </div>
    </div>
  );
} 


export default OpenADList
