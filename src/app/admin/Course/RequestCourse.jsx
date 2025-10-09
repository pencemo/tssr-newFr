import Loader from "@/components/ui/loader";
import {
  useChangeStatusOfRequestCourse,
  useRequestCourseForAdmin,
} from "@/hooks/tanstackHooks/useRequest";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function RequestCourse() {
  const { data, isLoading, error } = useRequestCourseForAdmin();
  const { mutate, isPending } = useChangeStatusOfRequestCourse();
  const [loading, setLoading] = useState(null);

  const handleSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      },
      onError: (error) => {
        toast.error("Something went wrong");
      },
    });
  };

  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  if (error) return <div>Error</div>;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Course Request</h1>
      </div>
      <div className="rounded-xl border overflow-hidden mt-10">
        <Table className={" "}>
          <TableHeader className='uppercase'>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead>Study Center</TableHead>
              <TableHead>Name of Course</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className={'text-end'}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium w-80 whitespace-normal  break-words">
                  {item?.studycenterId?.name}
                </TableCell>
                <TableCell className=" whitespace-normal break-words">{item?.courseId?.name}</TableCell>
                <TableCell className="">
                  {format(new Date(item?.requestedDate), "dd MMM yyyy")}
                </TableCell>
                <TableCell>
                <Badge
                      variant={item.status === "pending" ? "outline" :item.status === "approved" ? "": "destructive" }
                      className="rounded-full w-full max-w-24  capitalize"
                    >
                      {item.status}
                    </Badge>
                  
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  {item.status == "pending" && (
                    <>
                      <Button
                        className="w-20"
                        onClick={() =>{
                          handleSubmit({
                            requestId: item._id,
                            status: "approved",
                          })
                          setLoading('approved')}
                        }
                        variant="outline"
                        size="sm"
                      >
                        {loading === "approved" && isPending ? <Loader2 className="animate-spin"/>:"Accept"}
                        
                      </Button>
                      <Button
                        className="w-20"
                        onClick={() =>{
                          handleSubmit({
                            requestId: item._id,
                            status: "rejected",
                          })
                          setLoading("rejected")
                        }
                        }
                        variant="destructive"
                        size="sm"
                      >
                        {loading === 'rejected' && isPending ? <Loader2 className="animate-spin"/>:"Reject"}
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default RequestCourse;
