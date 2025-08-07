import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export function ResultTable({ data, setSelectedIds, selectedIds }) {
  console.log(data);
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((item) => item?._id));
    }
  };
  return (
    <Table className="border-b ">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox
              checked={selectedIds.length === data.length}
              onCheckedChange={toggleSelectAll}
            />
          </TableHead>
          <TableHead className="w-[50px] ">No</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>admissionNumber</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Study Center</TableHead>
          <TableHead>Date Of Exam</TableHead>
          <TableHead>Remark</TableHead>
          <TableHead>Grade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={i}>
            <TableCell>
              <Checkbox
                checked={selectedIds.includes(item?._id)}
                onCheckedChange={() => toggleSelect(item?._id)}
              />
            </TableCell>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell className="font-medium md:whitespace-normal md:max-w-60 break-words">
              {item?.studentName}
            </TableCell>
            <TableCell>{item?.admissionNumber}</TableCell>
            <TableCell>{item?.courseName}</TableCell>
            <TableCell>{item?.studyCenterName}</TableCell>
            <TableCell>{item?.dateOfExam}</TableCell>
            <TableCell>
              {item?.remark?.toLowerCase() === "pass" ? <Badge className="rounded-full w-full max-w-20 bg-green-100 text-green-700">Pass</Badge>: <Badge className="rounded-full w-full max-w-20 bg-red-100 text-red-700">Fail</Badge>}
            </TableCell>
            <TableCell className='font-medium'>{item?.grade || "Nill"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
