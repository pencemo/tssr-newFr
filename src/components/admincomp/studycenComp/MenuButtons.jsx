import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { excelDownload } from "@/lib/ExcelDownload";
import { useGetStudyCenterForExcel } from "@/hooks/tanstackHooks/useStudyCentre";
import { Download04Icon } from "hugeicons-react";
import { Loader2, MoreVerticalIcon } from "lucide-react";

const EXPORT_FIELDS = [
  { id: "isActive", label: "Status" },
  { id: "atcId", label: "ATC ID" },
  { id: "centerHead", label: "Center Head" },
  { id: "createdAt", label: "Created Date" },
];

export function MenuButtons() {
  const { data, isLoading } = useGetStudyCenterForExcel();
  const [processedData, setProcessedData] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [includedFields, setIncludedFields] = useState([]);

  useEffect(() => {
    if (!data?.data) return;

    const sortedData = [...data.data].sort((a, b) => {
      return sortBy === "name"
        ? (a.name || "").localeCompare(b.name || "")
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const filteredData = sortedData.map((item) => {
      const newItem = { ...item };

      if (includedFields.length) {
        const excludedIds = EXPORT_FIELDS.filter(
          (field) => !includedFields.includes(field.id)
        ).map((f) => f.id);

        excludedIds.forEach((id) => delete newItem[id]);
      }

      newItem.courses = newItem.courses?.map((course) => course?.name) || [];
      return newItem;
    });

    setProcessedData(filteredData);
  }, [data, sortBy, includedFields]);

  const toggleField = (fieldId) =>
    setIncludedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );

  const handleDownload = async () => {
    try {
      excelDownload(processedData);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download study center data.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVerticalIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 shadow-2xl" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Export Options</h4>
            <p className="text-sm text-muted-foreground">
              Select fields to include in export
            </p>
          </div>

          <div className="space-y-3">
            {/* Sort Option */}
            <div className="flex items-center justify-between">
              {/* <label className="text-sm font-medium">Sort By:</label> */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Default)</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Field Selector */}
            <div>
              <p className="text-sm font-medium mb-2">Include Fields:</p>
              <div className="grid grid-cols-1 gap-2">
                {EXPORT_FIELDS.map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`field-${id}`}
                      checked={includedFields.includes(id)}
                      onCheckedChange={() => toggleField(id)}
                    />
                    <label htmlFor={`field-${id}`} className="text-sm">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleDownload}
            disabled={isLoading || !processedData.length}
            className="w-full mt-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span className="flex items-center">
                Export to Excel
                <Download04Icon className="ml-2" />
              </span>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
