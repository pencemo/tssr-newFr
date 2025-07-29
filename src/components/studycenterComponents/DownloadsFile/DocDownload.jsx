import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download04Icon } from "hugeicons-react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import SelectDropDown from "./SelectDropDown";
import PDFDesign from "./PDFDesign";
import { useReactToPrint } from "react-to-print";
import { useStudentForDl } from "@/hooks/tanstackHooks/useStudents";
import { useSettings } from "@/hooks/tanstackHooks/useAuth";
import { excelDownload } from "@/lib/ExcelDownload";

export function DocDownload({ name, fields, mark, date }) {
  const contentRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState(null);
  const [loadingType, setLoadingType] = useState(null); // 'pdf' | 'excel'
  const [filters, setFilters] = useState({ course: "", batch: "", year: "" , studycenterId: ""});

  const { isPending, mutateAsync } = useStudentForDl();
  const { data: settings } = useSettings();

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: name,
  });

  useEffect(() => {
    if (!isOpen) {
      setFilters({ course: "", batch: "", year: "" });
      setError(null);
      setPdfData(null);
    }
  }, [isOpen]);

  const validateFilters = () => {
    if (!filters.course || !filters.batch || !filters.year) {
      setError("Please select all filters");
      return false;
    }
    return true;
  };

  const fetchData = async () => {
    return mutateAsync({
      courseId: filters.course,
      batchId: filters.batch,
      year: filters.year,
      studyCenter: filters.studycenterId,
      fields: ["name", "admissionNumber"],
    });
  };

  const handleDownloadPDF = async () => {
    if (!validateFilters()) return;
    setLoadingType("pdf");
    try {
      const result = await fetchData();

      if (!result.success || result.data.length === 0) {
        const msg = result.message || "No data found";
        toast.error(msg);
        setError(msg);
        return;
      }

      setPdfData(result);

      setTimeout(() => {
        handlePrint();
      }, 200); // Delay to allow DOM update
      setFilters({ course: "", batch: "", year: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setError("Something went wrong");
    } finally {
      setLoadingType(null);
    }
  };

  const handleDownloadExcel = async () => {
    if (!validateFilters()) return;
    setLoadingType("excel");

    try {
      const result = await fetchData();

      if (!result.success || result.data.length === 0) {
        const msg = result.message || "No data found";
        toast.error(msg);
        setError(msg);
        return;
      }

      const rows = result.data.map((item) => ({
        "Admission Number": item.admissionNumber,
        Name: item.name,
        ...Object.fromEntries(fields.map((field) => [field, ""])),
      }));

      const fileName = result.studycenterName || "Attendance Sheet";
      excelDownload(rows, fileName);
      setFilters({ course: "", batch: "", year: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      toast.error("Excel download failed");
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button disabled={!settings?.data?.reportsDownload} className="w-full">
            Download Doc
            <Download04Icon className="ml-2" strokeWidth={2} />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>
              Select course, batch, and year to download the {name}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <SelectDropDown error={error} filters={filters} setFilters={setFilters} />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <DialogFooter className="grid grid-cols-2 gap-2 mt-2">
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              disabled={loadingType === "pdf" && isPending}
            >
              {loadingType === "pdf" && isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Download PDF"
              )}
            </Button>

            <Button
              onClick={handleDownloadExcel}
              disabled={loadingType === "excel" && isPending}
            >
              {loadingType === "excel" && isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Download Excel"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden PDF Component for Printing */}
      <div className="sr-only">
        <div ref={contentRef}>
          <PDFDesign
            date={date}
            marks={mark}
            headers={fields}
            name={name}
            data={pdfData || {}}
          />
        </div>
      </div>
    </>
  );
}
