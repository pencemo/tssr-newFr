import { Button } from '@/components/ui/button'
import { useUploadResult } from '@/hooks/tanstackHooks/useResult'
import { excelToJson } from '@/lib/excelToJson'
import { Upload02Icon } from 'hugeicons-react'
import React, { useRef } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

function Upload() {
    const [excel, setExcel] = useState(null)
    const {mutate, isPending}=useUploadResult()
    const inputRef = useRef(null)

    const fixedKeys = [
        "admissionNumber",
        "name",
        "studyCenterName",
        "examCenterName",
        "courseName",
        "duration",
        "dateOfExam",
        "grade",
        "remark",
      ];

      const handleCancel = () => {
        setExcel(null)
        if (inputRef.current) {
          inputRef.current.value = "";
        }
    }

    const handleUpload = async () => {
        if(!excel){
            toast.error('Please upload a file')
            return 
        }
        const jsonData = await excelToJson(excel)

        const data = jsonData.map((row) => {
            const transformedRow = {};
            const subjects = [];
  
            for (const key in row) {
              if (fixedKeys.includes(key)) {
                transformedRow[key] = row[key];
              } else {
                subjects.push({ name: key, grade: row[key] });
              }
            }
  
            return {
              ...transformedRow,
              subjects,
            };
          });
        mutate({resultsArray:data}, {
            onSuccess: (data) => {
                if(data.success){
                    toast.success('Data uploaded successfully')
                    handleCancel()
                }else{
                    toast.error(data.message)
                }
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    
  return (
    <div className='w-full'>
        <div>
            <input ref={inputRef}  onChange={(e)=>setExcel(e.target.files[0])} accept='.csv, .xlsx' type="file" className='sr-only' id="excelUpload" />
            <label htmlFor="excelUpload" className='w-full text-center flex flex-col items-center justify-center px-2 py-10 border border-dashed rounded-2xl hover:border-primary hover:bg-primary-foreground/50 cursor-pointer transition-all duration-300'>
                <Upload02Icon className='text-primary'/>
                <span className=' mt-2 text-sm text-muted-foreground'>Upload Excel file</span>
                {excel&&<span className='text-xs text-green-600 '>{excel?.name}</span>}
            </label>
        </div>
        <div className='mt-3 flex justify-end gap-2'>
            <Button onClick={handleCancel} size="sm" variant='outline' >Cancel</Button>
            <Button onClick={handleUpload} size="sm" variant='' >
                {isPending?'Uploading...':'Upload result'}
            </Button>
        </div>
    </div>
  )
}

export default Upload