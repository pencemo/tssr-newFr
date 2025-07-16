import { StudentTable } from '@/components/studycenterComponents/StudentView/StudentTable';
import Pagination from '@/components/ui/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useStudentOfStudyCenter } from '@/hooks/tanstackHooks/useStudents';
import React, { useEffect, useState } from 'react'
import { HiArrowSmallLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

function ApprovelPendingStudent() {
    const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate()

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
        <div className='flex justify-between items-center max-sm:flex-col gap-2'>
            <div className='flex items-center justify-center gap-x-2 '>
            <Button onClick={()=>navigate(-1)} size='icon' variant='secondary' className='hover:bg-gray-200 cursor-pointer' ><HiArrowSmallLeft /></Button>
            <h1 className='text-2xl font-semibold'>Approvel pending student</h1> 
            </div>
            <Input onChange={(e)=>setSearch(e.target.value)} className='max-w-sm max-sm:max-w-full' placeholder='Search by name' />
        </div>
        <div className="rounded-2xl border overflow-hidden mt-6">
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