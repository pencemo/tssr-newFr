import Pagination from "@/components/ui/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStudentOfStudyCenter } from "@/hooks/tanstackHooks/useStudents";
import React, { useEffect, useState } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import {  StudentVarificationTable } from "@/components/studycenterComponents/StudentView/StudentVarificationTable";
import { useAllVarificationStudents, useUpdateStatusofVerification } from "@/hooks/tanstackHooks/useStudentVarification";
import NoData from "@/components/ui/noData";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";
import { useAuth } from "@/Context/authContext";

function StudentsVerification() {
  const [search, setSearch] = useState("");
  const {user}=useAuth()
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [status, setStatus]=useState('pending')
  const [selectedIds, setSelectedIds] = useState([]);
  const {mutate, isPending}=useUpdateStatusofVerification()
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, error, isLoading } = useAllVarificationStudents(
    currentPage,
    20,
    debouncedSearch,
    status,
  );

  useEffect(() => {
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    setSelectedIds([])
  }, [status]);

  const handleSubmit =(ids, status)=>{
    mutate({pendingIds:ids, status}, {
      onSuccess:(data)=>{
        if(data.success){
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      }
    })
  }

  if(error) return <div>Error</div>;
  return (
    <div>
      <div className="flex justify-between items-center   gap-2">
        <h1 className="text-lg md:text-2xl font-bold">
          Students Verification
        </h1>
        <div className="flex gap-2 items-center">
      {user?.isAdmin &&  <div className="space-x-2">
          <Button onClick={()=>handleSubmit(selectedIds, 'approved')} disabled={!selectedIds.length>0} variant="outline">Approve</Button>
          <Button onClick={()=>handleSubmit(selectedIds, 'rejected')} disabled={!selectedIds.length>0} variant="destructive">Reject</Button>
        </div>}

        </div>
      </div>
      <div className="flex justify-between items-center max-sm:flex-col gap-2 mt-4 ">
        <div className="gap-2 max-sm:w-full grid grid-cols-2">
          <Button variant={status==="pending"?"default":"secondary"} onClick={()=>setStatus('pending')} className={'w-full h-8'}>Pending </Button>
          <Button variant={status ==="rejected"?"default":"secondary"} onClick={()=>setStatus('rejected')} className={'w-full h-8'}>Rejected </Button>
        </div>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm max-sm:max-w-full"
          placeholder="Search by Name, Center, Course"
        />
      </div>
      {isLoading ? <div><Loader/></div>:
      data?.students.length > 0 ?<div className="rounded-2xl border overflow-hidden mt-6">
        <StudentVarificationTable onSubmit={handleSubmit} status={status} data={data?.students || []} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        <Pagination
          totalData={data?.totalData || 0}
          currentPage={currentPage}
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
        />
      </div>:
      <NoData/>
      }
    </div>
  );
}

export default StudentsVerification;
