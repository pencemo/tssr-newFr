import { StudentTable } from '@/components/studycenterComponents/StudentView/StudentTable';
import Pagination from '@/components/ui/Pagination';
import { Input } from '@/components/ui/input'
import { useStudentOfStudyCenter } from '@/hooks/tanstackHooks/useStudents';
import React, { useEffect, useState } from 'react'

function ApprovelPendingStudent() {
    const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);  
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, error, isLoading } = useStudentOfStudyCenter(
    currentPage,
    20,
    debouncedSearch,
  )

  useEffect(() => {
    if (data && data.data) {
      setStudents(data.data);
    }
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  return (
    <div>
        <div className='flex justify-between items-center gap-x-2'>
            <div>
                
            <h1 className='text-2xl font-semibold'>Approvel pending student</h1> 
            </div>
            <Input onChange={(e)=>setSearch(e.target.value)} className='max-w-sm max-sm:max-w-full' placeholder='Search by name' />
        </div>
        <div className="rounded-md border mt-6">
              <StudentTable data={students} />
              <Pagination
                totalData={data?.totalData}
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
              />
        </div>
    </div>
  )
}

export default ApprovelPendingStudent