
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Alert } from "@/components/ui/Alert";
import { toast } from "sonner";
import { TableExams } from "./TableExams";
import {
  useCloseScheduledExam,
  useDeleteExam,
  useGetScheduledEXam,
} from "@/hooks/tanstackHooks/useExam";
import { PasswordDelete } from "@/components/ui/passwordDelete";

export function ScheduledExams() {
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending } = useCloseScheduledExam();
  const { data, error, isLoading } = useGetScheduledEXam();
  const [isError, setError]=useState(null)
  const [examId, setExamId]=useState(null)
  const [examModelOpen, setExamModelOpen]=useState(false)
  const {mutate:deleteExam, isPending:deleteExamPending} = useDeleteExam()

  useEffect(() => {
    if (isError) {
      setError(null);
    } 
  }, [examModelOpen,isModalOpen])


  const handleSetExamId = (id) => {
    setExamId(id);
    setExamModelOpen(true);
  };

  // New function to handle batch deletion
  const handleDeleteBatch = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
    setExamModelOpen(false)
  };

  const handleUpdateStatus = (password) => {

    setError(null)
    const batchId = selectedRow?.batchId;
    const examScheduleId = selectedRow?.examScheduleId;

    if(password === "") return setError('Please enter password')

    mutate(
      { batchId, examScheduleId, password },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("Batch deleted successfully");
            onClose();
          } else {
            setError(data.message)
            toast.error(data.message);
          }
        },
        onError: (error) => {
          toast.error("Failed to delete batch");
          setError("Something went wrong")
        },
      }
    );
  };

  const handelDeleteExam = (password) => {

    setError(null)

    if(password === "") return setError('Please enter password')

    deleteExam(
      { examScheduleId: examId, password },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("Exam deleted successfully");
            onClose();
          } else {
            setError(data.message)
            toast.error(data.message);
          }
        },
        onError: (error) => {
          toast.error("Failed to delete exam");
          setError("Something went wrong")
        },
      }
    );
  };

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
        Error to fetch data
      </div>
    );
  }

  return (
    <div className="w-full h-full mt-6">
      <div className="space-y-6 w-full h-full">
        <div className="flex max-sm:flex-col gap-2 justify-between items-center">
          <div className="max-sm:w-full flex items-center justify-center gap-2">
            <h1 className="text-xl font-semibold">Scheduled Exams</h1>
          </div>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
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
        ) : data?.data?.length > 0 ? (
          <div className="rounded-2xl bord er">
            <TableExams
              data={data?.data}
              onSetExamId={handleSetExamId}
              onDeleteBatch={handleDeleteBatch}
              search={search}
              loading={isPending}
              selected={selectedRow}
              onClose={onClose}
            />
            {/* batchDelet */}
            <PasswordDelete
            deleteFn={handleUpdateStatus}
            isOpen={isModalOpen}
            loading={isPending}
            setIsOpen={setIsModalOpen}
            error={isError}
            /> 
            {/* exam Delete */}
            <PasswordDelete
            deleteFn={handelDeleteExam}
            isOpen={examModelOpen}
            loading={deleteExamPending}
            setIsOpen={setExamModelOpen}
            error={isError}
            />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
            No data found
          </div>
        )}
      </div>
    </div>
  );
}

