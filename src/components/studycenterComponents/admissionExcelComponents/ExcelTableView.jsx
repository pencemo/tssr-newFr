// ExcelTableView.jsx
import { useEffect, useState } from "react";
import { ExcelTableLayout } from "./ExcelTableLayout";
import { FileUploadDialog } from "./FileUploadDialog";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBulkEnrollStudents } from "@/hooks/tanstackHooks/useEnrollment";

export function ExcelTableView({ tableData, course, setStep }) {
  const [newStudents, setNewStudents] = useState([]);
  const [pendingEnrollmentStudents, setPendingEnrollmentStudents] = useState(
    []
  );
  const [unavailableStudents, setUnavailableStudents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [row, setRow] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { mutate } = useBulkEnrollStudents();

  function handleUploadClick(row) {
    setRow(row);
    setDialogOpen(true);
  }
  useEffect(() => {
    if (!tableData) return;

    setNewStudents(tableData.newStudents || []);
    setPendingEnrollmentStudents(tableData.pendingEnrollmentStudents || []);
    setUnavailableStudents(tableData.unavailableStudents || []);
  }, [tableData]);
  const handleSubmit = () => {
    if (!termsAccepted) {
      toast.warning("Please accept the terms and conditions.");
      return;
    }

    const allValid = newStudents.every(
      (student) => student.profileImage != "" && student.sslc != ""
    );
    if (!allValid) {
      toast.warning(
        "Please upload profile image and SSLC file for all students."
      );
      return;
    }
    mutate(
      { newStudents, pendingEnrollmentStudents, course },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Students enrolled successfully.");
            setNewStudents([]);
            setPendingEnrollmentStudents([]);
            setUnavailableStudents([]);
            setStep(1);
          } else {
            toast.error("Error enrolling students.");
          }
        },
      }
    );
    console.log(" Submitted:", newStudents);
  };

  return (
    <>
      <div className="py-4 space-y-8">
        {newStudents.length > 0 && (
          <ExcelTableLayout
            title="New Students"
            students={newStudents}
            rowColor="bg-green-50"
            enableUpload={true}
            onEditClick={handleUploadClick}
          />
        )}
        {row && (
          <FileUploadDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            student={row}
            setNewStudents={setNewStudents}
            newStudents={newStudents}
            setRow={() => setRow(null)}
          />
        )}
        {pendingEnrollmentStudents.length > 0 && (
          <ExcelTableLayout
            title="Available Students"
            students={pendingEnrollmentStudents}
            rowColor="bg-green-50"
          />
        )}

        {unavailableStudents.length > 0 && (
          <ExcelTableLayout
            title="Invalid Students"
            students={unavailableStudents}
            rowColor="bg-red-50"
          />
        )}
        {/* Terms and Submit */}
        {(newStudents.length > 0 ||pendingEnrollmentStudents.length > 0 ) && (
          <div>
            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={setTermsAccepted}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions
              </Label>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSubmit} className="mt-4 ">
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
