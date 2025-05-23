// ExcelTableLayout.jsx
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUploadDialog } from "./FileUploadDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ExcelTableLayout({
  title,
  students,
  rowColor,
  enableUpload = false,
  onEditClick,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <Table className="min-w-full">
        <TableCaption>{title} List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Aadhaar</TableHead>
            <TableHead>Reg. No</TableHead>
            {enableUpload && (
              <>
                <TableHead>Upload Files</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index} className={rowColor}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={
                      student.profileImage ||
                      "https://imgs.search.brave.com/Tdd-8hSXGxRJvnfZAxvVjk9_01vEQe4FraxeApkoyc0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzlhLzU2/L2JmLzlhNTZiZjRm/YjlkZmJkNzVhYTBm/OTFiNjI4NDBmM2Zh/LmpwZw"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback className="capitalize">{student.name[0]}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.phoneNumber}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.adhaarNumber}</TableCell>
              <TableCell>{student.registrationNumber}</TableCell>

              {enableUpload && (
                <>
                  <TableCell>
                    {student.profileImage === "" || student.sslc === "" ? (
                      <Button
                        onClick={() => {
                          onEditClick(student);
                        }}
                      >
                        Upload
                      </Button>
                    ) : (
                      <Button disabled> Uploaded</Button>
                    )}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={enableUpload ? 7 : 6}>Total Students</TableCell>
            <TableCell className="text-right">{students.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
