import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useUploadResult } from '@/hooks/tanstackHooks/useResult'
import { excelToJson } from '@/lib/excelToJson'
import { Upload02Icon } from 'hugeicons-react'
import React, { useRef } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Upload() {
    const [excel, setExcel] = useState(null)
    const {mutate, isPending}=useUploadResult()
  const inputRef = useRef(null)
  const [examType, setExamType] = useState("");
  const [error , setError] = useState("")

    const fixedKeys = [
        "admissionNumber",
      "name",
        "examName",
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
       setError(""); 
        if(!excel){
          toast.error('Please upload a file')
          setError("Please upload a file");
            return 
      }
          if (!examType) {
            toast.error("Please select Final Exam or Not Final Exam");
            setError("Please select Final Exam or Not Final Exam");
            return;
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
    mutate(
      {
        resultsArray: data,
        examType: examType,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("Data uploaded successfully");
            handleCancel();
          } else {
            toast.error(data.message);
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
    }

    
  return (
    <div className="w-full">
      <div>
        <input
          ref={inputRef}
          onChange={(e) => setExcel(e.target.files[0])}
          accept=".csv, .xlsx"
          type="file"
          className="sr-only"
          id="excelUpload"
        />
        <label
          htmlFor="excelUpload"
          className="w-full text-center flex flex-col items-center justify-center px-2 py-10 border border-dashed rounded-2xl hover:border-primary hover:bg-primary-foreground/50 cursor-pointer transition-all duration-300"
        >
          <Upload02Icon className="text-primary" />
          <span className=" mt-2 text-sm text-muted-foreground">
            Upload Excel file
          </span>
          {excel && (
            <span className="text-xs text-green-600 ">{excel?.name}</span>
          )}
        </label>
      </div>
      <div className="flex max-md:flex-col gap-4 justify-between md:items-center mt-6">
        {/* Radio Buttons */}
        <RadioGroup
          onValueChange={setExamType}
          value={examType}
          className="flex flex-row gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="final" id="final" />
            <Label htmlFor="final">Final Exam</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not_final" id="not_final" />
            <Label htmlFor="not_final">Not Final Exam</Label>
          </div>
        </RadioGroup>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleCancel} size="sm" variant="outline">
            Cancel
          </Button>
          <Button onClick={handleUpload} size="sm">
            {isPending ? "Uploading..." : "Upload result"}
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default Upload