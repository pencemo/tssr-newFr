import { useState } from "react";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Alert } from "@/components/ui/Alert";
import { toast } from "sonner";
import { TableExams } from "./TableExams";
import { useCloseScheduledExam, useGetScheduledEXam } from "@/hooks/tanstackHooks/useExam";

export function ScheduledExams() {
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {mutate}=useCloseScheduledExam()
  const { data, error, isLoading } = useGetScheduledEXam();

  

  const handleEdit = (rowData) => {
    setSelectedRow(rowData)
    setIsModalOpen(true)
  }

  const onClose = () => {
    setIsModalOpen(false)
    setSelectedRow(null)
  }

  const handleUpdateStatus = () => {
    const batchId = selectedRow?.batchId
    const examScheduleId = selectedRow?.examScheduleId
    mutate(
      { batchId, examScheduleId },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success( "Exam deleted successfully");
            onClose()
          } else {
            toast.error("Somthing went wrong");
          }
        },
      }
    );
  };

  if (error) {
    return <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
    Error to fetch data
  </div>;
  }

  return (
    <div className=" w-full h-full mt-6">
      <div className="space-y-6 w-full h-full">
        <div className="flex max-sm:flex-col gap-2 justify-between items-center">
          <div className="max-sm:w-full flex items-center justify-center gap-2">
            <h1 className="text-xl font-semibold ">Scheduled Exams</h1>
          </div>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            type="text"
            placeholder="Search exams..."
            className="max-w-sm max-sm:max-w-full"
          />
        </div>

        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : data?.data?.length > 0 ?
          <div className="rounded-md border">
            <TableExams
              data={data?.data}
              onEdit={handleEdit}
              search={search}
            />
            <Alert deleteFn={handleUpdateStatus} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
          </div>:
          <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
          No data found
        </div>
          }
      </div>
    </div>
  );
} 


