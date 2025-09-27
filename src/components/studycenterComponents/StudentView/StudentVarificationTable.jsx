import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/authContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Delete01Icon, Edit02Icon, ViewIcon } from "hugeicons-react";
import { useDeleteStudentFromRejectList } from "@/hooks/tanstackHooks/useStudentVarification";
import { Alert } from "@/components/ui/Alert";
import { useState } from "react";
import { toast } from "sonner";
import Avatarview from "@/components/ui/avatarview";

export function StudentVarificationTable({
  data,
  status,
  selectedIds,
  setSelectedIds,
  onSubmit,
  disabled,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
 const {mutate, isPending}=useDeleteStudentFromRejectList()
 const [isDelete, setIsDelete] = useState(false)
 const [deleteId, setDeleteId] = useState()
  // Handle individual checkbox toggle
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const onSlected = (id) => {
    setDeleteId(id)
    setIsDelete(true)
  }

  // Handle "Select All" checkbox
  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((item) => item?._id));
    }
  };

  const handleDelete = async (id) => {
    if(isPending) return
    mutate({id}, {
      onSuccess: (data) => {
        if(data.success){
          toast.success("Student deleted successfully")
        }else{
          toast.error("Something went wrong")
        }
      },
      onError: (error) => {
        toast.error("Something went wrong")
      }
    })
  }

  const route = user?.isAdmin ? "admin" : "studycenter";

  return (
    <>
    <Table className="border-b">
      <TableHeader>
        <TableRow>
          {user?.isAdmin && (
            <TableHead className="w-[30px]">
              <Checkbox
                checked={selectedIds.length === data.length}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
          )}
          <TableHead className="w-[30px]">NO</TableHead>
          <TableHead className="w-[50px]">Profile</TableHead>
          <TableHead>Name</TableHead>
          {user?.isAdmin && <TableHead>Center</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Batch</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>View & Edit</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item._id}>
            {user?.isAdmin && (
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(item?._id)}
                  onCheckedChange={() => toggleSelect(item?._id)}
                />
              </TableCell>
            )}
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>
            <Avatarview src={item?.studentId?.profileImage} fallBack={item?.studentId?.name[1]?.toUpperCase() || "ST"}/>
              {/* <Avatar className={"border"}>
                <AvatarImage
                  className="object-cover"
                  src={
                    // item.profileImage
                    item?.studentId?.profileImage
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>{item?.studentId?.name[0]}</AvatarFallback>
              </Avatar> */}
            </TableCell>
            <TableCell>{item?.studentId?.name}</TableCell>
            {user?.isAdmin && (
              <TableCell className="md:min-w-40 md:whitespace-normal md:break-words ">
                {item?.studycenterId?.name}
              </TableCell>
            )}
            <TableCell>
              <Badge
                variant={
                  item.approvalStatus == "pending" ? "outline" : "destructive"
                }
                className="rounded-full capitalize"
              >
                {item.approvalStatus}
              </Badge>
            </TableCell>
            <TableCell className="md:min-w-40 md:whitespace-normal md:break-words ">
              {item.courseId.name}
            </TableCell>
            <TableCell>{item.batchId.month}</TableCell>
            <TableCell>{item.year}</TableCell>
            <TableCell >
            <div className="space-x-2">
              <Button
                variant="outline"
                // disabled={disabled}
                size="sm"
                onClick={() =>
                  navigate(
                    `/${route}/students/view?id=${item?._id}&isEnroll=false`
                  )
                }
              >
                View <ViewIcon/>
              </Button>
              <Button
                  variant='outline'
                  className='border border-primary text-primary hover:bg-primary-foreground hover:text-primary cursor-pointer'
                  size="sm"
                  onClick={() =>
                    navigate(
                      `/${route}/students/edit?id=${item?._id}&isEnroll=false`
                    )
                  }
                >
                  Edit <Edit02Icon className="size-3.5" size={16}/>
                </Button>
                </div>
            </TableCell>
            <TableCell>
              {user?.isAdmin && (status === "pending" ? (
                <div className="space-x-2">
                  <Button
                    onClick={() => onSubmit([item?._id], "approved")}
                    variant="outline"
                    disabled={disabled}
                    className="h-8 rounded-full"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => onSubmit([item?._id], "rejected")}
                    disabled={disabled}
                    variant="destructive"
                    className="h-8 rounded-full "
                  >
                    Reject
                  </Button>
                </div>) : 
                <Button onClick={()=>onSlected(item?._id)} variant="outline" className="h-8 hover:text-red-600 border-red-500 text-red-500">Delete <Delete01Icon/></Button>
              ) }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Alert isOpen={isDelete} setIsOpen={setIsDelete} deleteFn={()=>handleDelete(deleteId)}/>
    </>
  );
}
