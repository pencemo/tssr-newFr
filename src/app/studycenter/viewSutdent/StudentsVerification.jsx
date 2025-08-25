import Pagination from "@/components/ui/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { StudentVarificationTable } from "@/components/studycenterComponents/StudentView/StudentVarificationTable";
import {
  useAllVarificationStudents,
  useUpdateStatusofVerification,
} from "@/hooks/tanstackHooks/useStudentVarification";
import NoData from "@/components/ui/noData";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";
import { useAuth } from "@/Context/authContext";
import { Loader2 } from "lucide-react";
import { useFilters } from "@/Context/FilterContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function StudentsVerification() {
  const {searchPending, setSearchPending} = useFilters()
  const { user } = useAuth();
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [status, setStatus] = useState("pending");
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(null);
  const [perPage, setPerPage] = useState(20);
  const { mutate, isPending } = useUpdateStatusofVerification();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchPending);
      setCurrentPage(1);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchPending]);

  const { data, error, isLoading } = useAllVarificationStudents(
    currentPage,
    perPage,
    debouncedSearch,
    status
  );
  useEffect(() => {
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    setSelectedIds([]);
    
  }, [status]);

  
  const handleSubmit = (ids, status, btn) => {
    if(btn){
      setLoading(btn)
    }
    mutate(
      { pendingIds: ids, status },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
          setLoading(null)
           setSelectedIds([]);
        },
        onError: (error) => {
          toast.error(error.message);
          setLoading(null)
           setSelectedIds([]);
        }
      }
    );
  };

  if (error) return <div>Error</div>;
  return (
    <div>
      <div className="flex justify-between items-center   gap-2">
        <h1 className="text-lg md:text-2xl font-bold">Students Verification</h1>
        <div className="">
          {user?.isAdmin && (
            <div className="flex gap-2 items-center">
              <Button
                size="sm"
                onClick={() => handleSubmit(selectedIds, "approved", "btn1")}
                disabled={!selectedIds.length > 0 || isPending}
                variant="outline"
              >
                {loading === 'btn1' ? <Loader2 className="animate-spin" /> : "Approve"}
              </Button>
              <Button
                size="sm"
                onClick={() => handleSubmit(selectedIds, "rejected", "btn2")}
                disabled={!selectedIds.length > 0 || isPending}
                variant="destructive"
              >
                {loading === "btn2" ? <Loader2 className="animate-spin" /> : "Reject"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center max-sm:flex-col gap-2 mt-4 ">
        <div className="gap-2 max-sm:w-full grid grid-cols-2">
          <Button
            variant={status === "pending" ? "default" : "secondary"}
            onClick={() => setStatus("pending")}
            className={"w-full h-8"}
          >
            Pending{" "}
          </Button>
          <Button
            variant={status === "rejected" ? "default" : "secondary"}
            onClick={() => setStatus("rejected")}
            className={"w-full h-8"}
          >
            Rejected{" "}
          </Button>
        </div>
        <div className="flex gap-2 items-center max-sm:w-full max-sm:max-w-full">
        <Input
          onChange={(e) => setSearchPending(e.target.value)}
          value={searchPending}
          className="max-w-sm max-sm:max-w-full"
          placeholder="Search by Name, Center, Course"
        />
        <Select onValueChange={(value)=>setPerPage(value)} defaultValue={perPage}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className='w-[60px] max-w-[60px]'>
            <SelectGroup>
              {[10, 20, 50, 100].map((item) =><SelectItem value={item}>{item}</SelectItem>)}
            </SelectGroup>
          </SelectContent>
        </Select>

        </div>
      </div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : data?.students.length > 0 ? (
        <div className="rounded-2xl border overflow-hidden mt-6">
          <StudentVarificationTable
            onSubmit={handleSubmit}
            disabled={isPending}
            status={status}
            data={data?.students || []}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
          <Pagination
            totalData={data?.totalDate || 0}
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default StudentsVerification;
