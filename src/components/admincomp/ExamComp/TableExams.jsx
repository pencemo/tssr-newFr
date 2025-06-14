import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { format } from "date-fns";
  import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
  
  export function TableExams({ data, search, onEdit,loading, selected }) {
    // Transform and filter the data
    const filteredData = data
      .flatMap((exam) =>
        exam.batches.map((batch) => ({
          examScheduleId: exam.examScheduleId,
          courseId: {
            name: batch.courseName,
            category: exam.examName,
          },
          month: batch.batchMonth,
          startDate: exam.examDate.from,
          endDate: exam.examDate.to,
          examTime: exam.examTime,
          batchId: batch.batchId,
          examName: exam.examName,
          year: exam.year, 
        }))
      )
      .filter((item) => {
        const lowerSearch = search.toLowerCase();
        return (
          item.courseId.name.toLowerCase().includes(lowerSearch) ||
          item.examName.toLowerCase().includes(lowerSearch) ||
          item.month.toLowerCase().includes(lowerSearch)
        );
      });
  
    return (
      <div className="space-y-4">
       
  
        {/* Table */}
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Exam Name</TableHead>
              <TableHead>Batch Month</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Exam Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, i) => {
              return <TableRow className={loading && selected?.batchId === item?.batchId && 'opacity-40 pointer-events-none'} key={`${item.examScheduleId}-${item.batchId}`}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">{item.courseId.name}</TableCell>
                <TableCell>{item.examName}</TableCell>
                <TableCell>{item.month}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>
                    {format(new Date(item.startDate), "PPP")} -{" "}
                    {format(new Date(item.endDate), "PPP")}
                  </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="h-8 shadow-none min-w-32"
                    onClick={() => {
                      onEdit(item)
                    }}
                  >
                    {loading && selected?.batchId === item?.batchId ? <Loader2 className="animate-spin"/>:"Delete exam"}
                  </Button>
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </div>
    );
  }