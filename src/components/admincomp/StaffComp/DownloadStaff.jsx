import { Button } from '@/components/ui/button'
import { useGetAllStaffsForDl } from '@/hooks/tanstackHooks/useStaffs'
import { Download } from 'lucide-react'
import React from 'react'
import * as XLSX from "xlsx";

function DownloadStaff() {
    const {data, error, isLoading}=useGetAllStaffsForDl()

    const downloadExcel = (data, filename = 'data.xlsx') => {
        
        if(error || isLoading) return
        const flattenObject = (obj, prefix = '') => {
            let result = {};
            for (const key in obj) {
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    // Recursively flatten nested objects
                    const flattened = flattenObject(obj[key], `${prefix}${key}_`);
                    result = { ...result, ...flattened };
                } else {
                    // Add non-object properties directly
                    result[`${prefix}${key}`] = obj[key];
                }
            }
            return result;
        };
    
        // Flatten each object in the data array
        const flattenedData = data.map(item => flattenObject(item));
    
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(flattenedData);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, filename);
    };

  return (
    <Button  onClick={()=> downloadExcel(data?.data, "StaffData.xlsx")} variant='outline'>
             <Download strokeWidth={2}  />
          </Button>
  )
}

export default DownloadStaff