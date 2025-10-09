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
import { formatDateOnly, formateDateToIST } from "@/lib/formateDate";

export function TableList({ data, model, onEdit, button }) {
  const navigate = useNavigate();
  return (
    <Table className="border-b ">
      <TableHeader className='uppercase'>
        <TableRow>
          <TableHead className="w-[50px] ">No</TableHead>
          <TableHead >Course Name</TableHead>
          <TableHead >Category</TableHead>
          <TableHead >Duration</TableHead>
          <TableHead >Batch</TableHead>
          {model !== "closed" && <TableHead >Date</TableHead>}
          <TableHead ></TableHead>
         
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell className="font-medium md:whitespace-normal md:max-w-60 break-words">{item.courseId.name}</TableCell>
            <TableCell>{item.courseId.category}</TableCell>
            <TableCell>{item.courseId.duration}</TableCell>
            <TableCell>{item.month}</TableCell>
            {model !== "closed" &&
            <TableCell>{format(new Date(item.startDate), "PPP")} - {formatDateOnly(item.endDate, "PPP")}</TableCell>
            }
            <TableCell>
              <Button
                variant="outline"
                className="h-8 shadow-none"
                onClick={() => onEdit(item)}
              >
                {button || "Edit date"}
              </Button>
            </TableCell>
            {/* {model === "closed" &&
            <TableCell>
              <Switch/>
            </TableCell>
            } */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
