

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Alert } from "@/components/ui/Alert";
import { toast } from "sonner";
import { TableExams } from "./TableExams";
import {
  useCloseScheduledExam,
  useGetScheduledEXam,
} from "@/hooks/tanstackHooks/useExam";

export function ScheduledExams() {
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending } = useCloseScheduledExam();
  const { data, error, isLoading } = useGetScheduledEXam();

  console.log("scheduled exam :", data);

  const handleEdit = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  // New function to handle batch deletion
  const handleDeleteBatch = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleUpdateStatus = () => {
    const batchId = selectedRow?.batchId;
    const examScheduleId = selectedRow?.examScheduleId;

    console.log("selected row batchid:", selectedRow);
    console.log("selected row examId:", examScheduleId);

    mutate(
      { batchId, examScheduleId },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("Batch deleted successfully");
            onClose();
          } else {
            toast.error("Something went wrong");
          }
        },
        onError: (error) => {
          toast.error("Failed to delete batch");
          console.error("Delete error:", error);
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
          <div className="rounded-md border">
            <TableExams
              data={data?.data}
              onEdit={handleEdit}
              onDeleteBatch={handleDeleteBatch}
              search={search}
              loading={isPending}
              selected={selectedRow}
              onClose={onClose}
            />
            <Alert
              deleteFn={handleUpdateStatus}
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
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

