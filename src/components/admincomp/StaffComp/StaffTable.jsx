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
  import { format } from "date-fns";
  //   import { DeleteAlert } from "./DeletAlert";
  //   import { EditStudy } from "./EditStudy";
  import { useNavigate } from "react-router-dom";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Switch } from "@/components/ui/switch";
  
  export function StaffTable({ data,  onEdit }) {
    return (
      <Table className="border-b ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] ">No</TableHead>
            <TableHead >Name</TableHead>
            <TableHead >Category</TableHead>
            <TableHead >Duration</TableHead>
            <TableHead >Batch</TableHead>
            <TableHead ></TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell className="font-medium">{item.courseId.name}</TableCell>
              <TableCell>{item.courseId.category}</TableCell>
              <TableCell>{item.courseId.duration}</TableCell>
              <TableCell>{item.month}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="h-8 shadow-none"
                  onClick={() => onEdit(item)}
                >
                  Edit date
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  