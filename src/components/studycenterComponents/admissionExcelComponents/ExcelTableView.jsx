// ExcelTableView.jsx
import { useEffect, useState } from "react";
import { ExcelTableLayout } from "./ExcelTableLayout";
import { FileUploadDialog } from "./FileUploadDialog";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBulkEnrollStudents } from "@/hooks/tanstackHooks/useEnrollment";
import { Loader2 } from "lucide-react";

export function ExcelTableView({ tableData, course, onBack }) {
  const [newStudents, setNewStudents] = useState([]);
  const [isAccept, setAccept]=useState(false)
  const [pendingEnrollmentStudents, setPendingEnrollmentStudents] = useState(
    []
  );
  const [unavailableStudents, setUnavailableStudents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [row, setRow] = useState(null);
  const { mutate, isPending } = useBulkEnrollStudents();
  
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
    if (!isAccept) {
      toast.warning("Please accept the terms and conditions.");
      return;
    }

const allValid = newStudents.every(
  (student) => student?.profileImage && student?.sslc
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
            onBack();
          } else {
            toast.error("Error enrolling students.");
          }
        },
      }
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <h1>Students Data</h1>
      </div>
      <div className="py-4 space-y-8">
        {newStudents.length > 0 && (
          <ExcelTableLayout
            title="New Students"
            students={newStudents}
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
            enableUpload={false}
            students={pendingEnrollmentStudents}
          />
        )}

        {unavailableStudents.length > 0 && (
          <ExcelTableLayout
            title="Invalid Students"
            students={unavailableStudents}
            isError={true}
          />
        )}
        {/* Terms and Submit */}
        {(newStudents.length > 0 || pendingEnrollmentStudents.length > 0) && (
          <div>
            <div className="mt-5 border-t py-4">
              <h1 className="text-lg font-semibold text-gray-700 ">
                Student,s Declaration
              </h1>
              <p className="text-sm text-gray-600 mt-1 max-w-4xl">
                Hereby solemnly declare that the above information provided by
                me are true to the best of my knowledge and belief. I shall obey
                the rules and regulation of TSSR COUNCIL study centre, now in
                force and as amended or altered from time to time. I accept all
                decision of the TSSR COUNCIL authorities in all matters of
                training conducted discipline are no right of question them in
                any court of law.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Checkbox
                  id="checkbox"
                  checked={isAccept}
                  onCheckedChange={(value) => setAccept(value)}
                />
                <Label htmlFor="checkbox">
                  I agree to the declaration above.
                </Label>
              </div>
            </div>

            <div className="flex gap-3 justify-end mb-6">
              <Button variant={"outline"} onClick={onBack}>
                Back
              </Button>
              <Button disabled={!isAccept} onClick={handleSubmit} className="">
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit Data"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
