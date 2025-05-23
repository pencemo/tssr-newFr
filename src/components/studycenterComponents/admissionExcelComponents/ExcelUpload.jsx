import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExcelTableView } from "./ExcelTableView";
import { useCreateEnrollmentUsingExcel } from "@/hooks/tanstackHooks/useEnrollment";
import { excelToJson } from "@/lib/excelToJson";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";
import { LoaderCircle, LoaderIcon } from "lucide-react";


const ExcelUpload = ({ setStep, setCourse, course }) => {
  const [file, setFile] = useState(null);
  const { mutate, isPending } = useCreateEnrollmentUsingExcel();
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel")
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a valid Excel file.");
      toast.warning("Please select a valid Excel file");
      return;
    }

    const data = await excelToJson(file);
    mutate(data, {
      onSuccess: (res) => {
        if (res.success) {
          setTableData(res);
          toast.success("Excel data uploaded successfully.");
        } else toast.error("Failed to upload Excel data.");
      },
    });
  };
  function handleCancel() {
    setFile(null);
    setTableData([]);
    setError(null);
    setCourse(null);
    setStep(1);
  }

  return (
    <div>
      <Card className="w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Upload your Excel File
          </CardTitle>
          <CardDescription>
            Deploy your new project and upload data via Excel.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="excel"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Only .xlsx, .xls and .csv files are accepted.
              </p>
              {file && (
                <p className="text-sm font-medium text-green-600">
                  Uploaded: {file.name}
                </p>
              )}
              {error && (
                <p className="text-sm font-medium text-red-600">
                  Please select a valid Excel file.
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Back
              </Button>
              <Button onClick={handleUpload} className="md:w-20">
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Deploy"
                )}
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3"></CardFooter>
      </Card>

      {isPending ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <ExcelTableView
          tableData={tableData}
          course={course}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default ExcelUpload;
