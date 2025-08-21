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

export function StudentVarificationTable({
  data,
  status,
  selectedIds,
  setSelectedIds,
  onSubmit,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle individual checkbox toggle
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Handle "Select All" checkbox
  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((item) => item?._id));
    }
  };

  const route = user?.isAdmin ? "admin" : "studycenter";

  return (
    <Table className="border-b">
      <TableHeader>
        <TableRow>
          {user?.isAdmin && (
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedIds.length === data.length}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
          )}
          <TableHead className="w-[10px]">NO</TableHead>
          <TableHead className="w-[100px]">Profile</TableHead>
          <TableHead>Name</TableHead>
          {user?.isAdmin && <TableHead>Center</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Batch</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>View</TableHead>
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
              <Avatar className={"border"}>
                <AvatarImage
                  className="object-cover"
                  src={
                    // item.profileImage
                    item?.studentId?.profileImage
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{item?.studentId?.name}</TableCell>
            {user?.isAdmin && (
              <TableCell className='md:min-w-40 md:whitespace-normal md:break-words '>{item?.studycenterId?.name}</TableCell>
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
            <TableCell className='md:min-w-40 md:whitespace-normal md:break-words '>{item.courseId.name}</TableCell>
            <TableCell>{item.batchId.month}</TableCell>
            <TableCell>{item.year}</TableCell>
            <TableCell>
            <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigate(
                      `/${route}/students/view?id=${item?._id}&isEnroll=false`
                    )
                  }
                >
                  View Data
                </Button></TableCell>
            <TableCell>
              {user?.isAdmin && status === "pending" ? (
                <div className="space-x-2">
                  <Button
                    onClick={() => onSubmit([item?._id], "approved")}
                    variant="outline"
                    className="h-8 rounded-full"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => onSubmit([item?._id], "rejected")}
                    variant="destructive"
                    className="h-8 rounded-full "
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigate(
                      `/${route}/students/edit?id=${item?._id}&isEnroll=false`
                    )
                  }
                >
                  Edit student
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
