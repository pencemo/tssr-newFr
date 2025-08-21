
import { useOpenBatchesOfStudyCenter } from "@/hooks/tanstackHooks/useBatch";
import { CourseCard } from "./CourseCard";
import Loader from "@/components/ui/loader";
import { useEffect } from "react";
import { useState } from "react";
import { ExcelTableView } from "./ExcelTableView";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/Alert";

export default function OpenBatches({ onIndividual, setCourse, onBulk }) {
  const { data, isLoading, isError } = useOpenBatchesOfStudyCenter();
  const [savedData, setSavedData] = useState(null)
  const [isSaved, setSaved]=useState(false)
  const [isDelete, setDelete]=useState(false)
  
  useEffect(() => {
    const data = localStorage.getItem("studentData");
    if(data){
      setSavedData(JSON.parse(data))
    }
  }, [isSaved])

  const handleDelete=()=>{
    localStorage.removeItem("studentData")
    setSavedData(null)
    setDelete(false)
  }

  if (isLoading) return <div className="w-full h-full"><Loader  /></div>;
  if (isError) return <p className="text-center text-red-500">Failed to load batches</p>;
  if (isSaved) return <div><ExcelTableView tableData={{newStudents:savedData?.newStudents, pendingEnrollmentStudents: savedData?.pendingEnrollmentStudents}} course={savedData?.course} onBack={()=>setSaved(false)} /></div>


  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {savedData && <div className="w-full  mb-6">
        <h1 className="text-lg font-semibold mb-2">Saved Enrollments</h1>
        <Card className='max-w-sm'>
          <CardHeader>
            <CardTitle>Saved data</CardTitle>
            <CardDescription>You have saved student data in a course</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">The saved student data can only be accessed from the system where it was saved. Additionally, only one bulk upload can be saved at a time. If multiple enrollments are saved, the previous data will be replaced.</p>
          </CardContent>
          <CardFooter className='grid md:grid-cols-2 gap-2'>
            <Button variant='outline' className='bg-transparent border-red-500 text-red-500' onClick={()=>setDelete(true)} >Delete Saved</Button>
            <Button  onClick={()=>setSaved(true)} >Continew with saved</Button>
          </CardFooter>
        </Card>
        </div>}

      <h1 className="text-2xl font-bold mb-4">Admission Open Batches</h1>
    <Alert deleteFn={()=>handleDelete()} isOpen={isDelete} setIsOpen={setDelete} />
      {data?.batches?.length === 0 ? (
        <p>No open batches available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.batches.map(
            (batch) => (
              (
                <CourseCard
                  key={batch._id}
                  batch={batch}
                  onBulk={onBulk}
                  onIndividual={onIndividual}
                  setCourse={setCourse}
                />
              )
            )
          )}
        </div>
      )}
    </div>
  );
}
