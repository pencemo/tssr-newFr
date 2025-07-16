import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Loader2,
  ChevronDown,
  ChevronRight,
  Eye,
  Trash2,
  Calendar,
  Clock,
  BookOpen,
  Users,
} from "lucide-react";

export function TableExams({
  data,
  search,
  onSetExamId,
  loading,
  selected,
  onDeleteBatch,
}) {
  const [expandedRows, setExpandedRows] = useState(new Set());

  // Filter exam schedules based on search
  const filteredData = data.filter((exam) => {
    const lowerSearch = search.toLowerCase();
    return (
      exam.examName.toLowerCase().includes(lowerSearch) ||
      exam.year.toLowerCase().includes(lowerSearch) ||
      exam.batches.some(
        (batch) =>
          batch.courseName.toLowerCase().includes(lowerSearch) ||
          batch.batchMonth.toLowerCase().includes(lowerSearch)
      )
    );
  });

  const toggleRow = (examScheduleId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(examScheduleId)) {
      newExpanded.delete(examScheduleId);
    } else {
      newExpanded.add(examScheduleId);
    }
    setExpandedRows(newExpanded);
  };

  const handleDeleteBatch = (exam, batch) => {
    if (onDeleteBatch) {
      const rowData = {
        examScheduleId: exam.examScheduleId,
        batchId: batch.batchId,
        examName: exam.examName,
        courseName: batch.courseName,
        batchMonth: batch.batchMonth,
      };
      onDeleteBatch(rowData);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Exam Schedules Table */}
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-muted/50">
              <TableHead className="w-[60px] font-semibold">No</TableHead>
              <TableHead className="font-semibold">Exam Name</TableHead>
              <TableHead className="font-semibold hidden sm:table-cell">
                Year
              </TableHead>
              <TableHead className="font-semibold hidden md:table-cell">
                Exam Date
              </TableHead>
              <TableHead className="font-semibold hidden lg:table-cell">
                Exam Time
              </TableHead>
              <TableHead className="font-semibold">Batches</TableHead>
              <TableHead className="font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((exam, index) => {
              const isExpanded = expandedRows.has(exam.examScheduleId);
              const isLoading =
                loading && selected?.examScheduleId === exam.examScheduleId;

              return (
                <>
                  {/* Main Exam Row */}
                  <TableRow
                    key={exam.examScheduleId}
                    className={`
                      cursor-pointer transition-colors hover:bg-muted/50
                      ${isLoading ? "opacity-40 pointer-events-none" : ""}
                      ${isExpanded ? "bg-muted/30" : ""}
                    `}
                    onClick={() => toggleRow(exam.examScheduleId)}
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>

                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{exam.examName}</span>
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">{exam.year}</Badge>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {format(new Date(exam.examDate.from), "MMM dd")} -{" "}
                          {format(new Date(exam.examDate.to), "MMM dd")}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {exam.examTime.from} - {exam.examTime.to}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        <Users className="h-3 w-3 mr-1" />
                        {exam.batches.length} batch
                        {exam.batches.length !== 1 ? "es" : ""}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(exam.examScheduleId);
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-destructive border-destructive/20 hover:bg-destructive hover:text-white bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSetExamId(exam.examScheduleId)
                          }}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="h-3 w-3 mr-1" />
                              <span className="hidden sm:inline">Delete</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Batches Section */}
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={7} className="p-0">
                        <div className="p-4 bg-muted/20 border-t">
                          <div className="mb-3">
                            <h4 className="font-semibold flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              Exam Batches
                            </h4>
                          </div>

                          {/* Batches Grid - Responsive */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {exam.batches.map((batch) => {
                              const isBatchLoading =
                                loading &&
                                selected?.batchId === batch.batchId &&
                                selected?.examScheduleId ===
                                  exam.examScheduleId;

                              return (
                                <Card
                                  key={batch.batchId}
                                  className={`hover:shadow-md transition-shadow ${
                                    isBatchLoading
                                      ? "opacity-40 pointer-events-none"
                                      : ""
                                  }`}
                                >
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                                      <span className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        <span className="truncate">
                                          {batch.courseName}
                                        </span>
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className=" text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() =>
                                          handleDeleteBatch(exam, batch)
                                        }
                                        disabled={isBatchLoading}
                                      >
                                        {isBatchLoading ? (
                                          <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : (
                                          <Trash2 className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-0">
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                          Batch: {batch.batchMonth}
                                        </span>
                                      </div>
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        ID: {batch.batchId.slice(-8)}
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>

                          {exam.batches.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>No batches found for this exam</p>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}

            {filteredData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <BookOpen className="h-8 w-8 opacity-50" />
                    <p>No exam schedules found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
