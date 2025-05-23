import { EditStudy } from '@/components/admincomp/studycenComp/EditStudy';
import Loader from '@/components/ui/loader';
import { useAllCourse } from '@/hooks/tanstackHooks/useCourse';
import { useOneStudiCenter } from '@/hooks/tanstackHooks/useStudyCentre';
import React from 'react'
import { useParams } from 'react-router-dom';

function EditStudyCen() {
  const { id } = useParams();
  const {data, error, isLoading}=useOneStudiCenter(id)
  const { data: course } = useAllCourse()
  

  if (isLoading) return <div className='w-full h-full flex justify-center items-center'><Loader/></div>
  if (error) return <div className='w-full h-full flex justify-center items-center'>Error to get study centre data</div>
  return (
    
    <div className="w-full h-full max-w-[60rem] mx-auto border p-4 md:py-6 md:px-8 rounded-lg ">
    <div className="">
      <div className="">
        <h1 className="text-xl font-semibold">Edit Study Centre</h1>
        <p className="text-sm text-muted-foreground ">
          Submit details of study centre
        </p>
      </div>
      <div>
      <EditStudy data={data?.data} course={course?.data}/>
    </div>
      
    </div>
  </div>
  )
}

export default EditStudyCen
