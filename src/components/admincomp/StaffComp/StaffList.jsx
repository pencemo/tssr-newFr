import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Alert } from "@/components/ui/Alert";
import { toast } from "sonner";
import { StaffTable } from "./StaffTable";
import Pagination from "@/components/ui/Pagination";
import { HiOutlinePlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDeleteStaff, useGetAllStaffs } from "@/hooks/tanstackHooks/useStaffs";
import EditStaff from "./EditStaff";
import { PasswordDelete } from "@/components/ui/passwordDelete";
import { Download } from "lucide-react";
import DownloadStaff from "./DownloadStaff";

export function StaffList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [edit, setEdit] = useState(null)
  const [isdelete, setDelete]=useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isError, setError]=useState(null)
  const navigate = useNavigate()
  const {mutate, isPending}=useDeleteStaff()


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);  
    }, 1000); 

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, error, isLoading } = useGetAllStaffs(currentPage,20, debouncedSearch);


  useEffect(() => {
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  const onSetDelete = (id) => {
    setDelete(id)
    setIsModalOpen(true)
  }

  useEffect(()=>{
    setError(null)
  }, [isModalOpen])


  const handelDelete = (password) => {
    const data = {
      id: isdelete,
      password,
    }
    mutate(
      data,
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message)
            setIsModalOpen(false)
            setDelete(null)
            setError(null)
          } else {
            toast.error(data.message);
            setError(data.message)
          }
        },
        onError: (error) => {
          toast.error('Somthing went wrong');
          setError(error.message)
        }
      }
    );
  };

  if (error) {
    return <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
    Error to fetch data
  </div>;
  }

  if(edit){
    return <EditStaff setEdit={setEdit} data={edit}/>
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
          <div className="sm:flex grid grid-cols-2 items-center gap-2 max-sm:w-full">
          <Button onClick={()=>navigate("add-staff")}>
            Add Staff <HiOutlinePlus strokeWidth={2}  />
          </Button>
          <DownloadStaff/>
            
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : data?.staffs?.length > 0 ?
          <div className="rounded-2xl overflow-hidden border">
            <StaffTable
              data={data.staffs}
              onEdit={(rowData)=>setEdit(rowData)}
              onDelete={onSetDelete}
            />
            <PasswordDelete loading={isPending} error={isError} deleteFn={handelDelete}  isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            
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