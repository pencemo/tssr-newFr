import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/Context/authContext";
import { useSettings } from "@/hooks/tanstackHooks/useAuth";
  
  
  export function StudentTable({data}) {
    const { user } = useAuth()
    const { data:settings } = useSettings();
    const settingData = settings?.data;
    const navigate = useNavigate()
    return (
      <Table className="border-b">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px]">NO</TableHead>
            <TableHead className="w-[100px]">Profile</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead>Mobile</TableHead>
            {user?.isAdmin && <TableHead>Center</TableHead>}
            <TableHead>Course</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Admission NO</TableHead>
            <TableHead>View</TableHead>
            {(user.isAdmin ||settingData.editStudentDataPermission ) && <TableHead>Edit</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell className="font-medium">
                <Avatar className={' border'}>
                  <AvatarImage
                    className="object-cover"
                    src={
                      item.profileImage
                        ? item.profileImage
                        : "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{item.studentName}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              {user?.isAdmin && <TableCell>{item?.studycenterName}</TableCell>}
              <TableCell>{item.courseName}</TableCell>
              <TableCell>{item.batchMonth}</TableCell>
              <TableCell>{item.year}</TableCell>
              <TableCell>{item.admissionNumber}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`view?id=${item.enrollmentId}&isEnroll=true`)}
                >
                  View student
                </Button>
              </TableCell>

              {(user.isAdmin ||settingData.editStudentDataPermission )  && (
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`edit?id=${item.enrollmentId}&isEnroll=true`)}
                  >
                    Edit student
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    );
  }

