import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Loader from "@/components/ui/loader";
import { useChangeStatusAdmission, useOpenAdmissinList } from "@/hooks/tanstackHooks/useAdmission";
import { Alert } from "@/components/ui/Alert";
import { toast } from "sonner";
import { StaffTable } from "./StaffTable";
import Pagination from "@/components/ui/Pagination";
import { AddStaff } from "./AddStaff";

export function StaffList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [batchs, setBatches] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {mutate}=useChangeStatusAdmission()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password:""
})

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

  const onClose = () => {
    setIsModalOpen(false)
    setSelectedRow(null)
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
          
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            type="text"
            placeholder="Search users..."
            className="max-w-sm max-sm:max-w-full"
          />
          <AddStaff formData={formData} setFormData={setFormData} />
        </div>

        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : batchs.length > 0 ?
          <div className="rounded-md border">
            <StaffTable
              data={batchs}
              onEdit={handleEdit}
            />
            <Alert deleteFn={handleUpdateStatus} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            
            <Pagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} />
          </div>:
          <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
          No data found
        </div>
          }
      </div>
    </div>
  );
} 



export default StaffList