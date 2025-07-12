"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddSubjects from "@/components/admincomp/courseComp/AddSubjects";
import SubjectCard from "@/components/admincomp/courseComp/SubjectCard";
import {
  useAllTrueAndFalseSubjects,
  useUpdateSubjects,
} from "@/hooks/tanstackHooks/useSubjects";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const subjectsData = [
  { id: 1, name: "Mathematics", code: "MATH101", isActive: true },
  { id: 2, name: "Physics", code: "PHYS201", isActive: false },
  { id: 3, name: "Chemistry", code: "CHEM301", isActive: true },
];

export default function SubjectList() {
  const [subjects, setSubjects] = useState(subjectsData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const navigate = useNavigate()
  const { data } = useAllTrueAndFalseSubjects();
  useEffect(() => {
    if (data) {
      setSubjects(data.data);
    }
  }, [data]);

  const { mutate, isPending } = useUpdateSubjects();

  const handleToggle = (code, newState) => {
    // Find the subject by code to get its id
    const subject = subjects.find((subj) => subj.code === code);
    if (!subject) {
      toast.error("Subject not found");
      return;
    }
    mutate(
      { id: subject._id },
      {
          onSuccess: (res) => {
              if (res.success) {
                toast.success(
                    `Subject ${res?.data?.name} is now ${
                    newState ? "Active" : "Inactive"
                  }`
                );
              } else {
                  toast.error("Failed to update subject status");
            }

          // Update local state with new isActive status
          setSubjects((prev) =>
            prev.map((subj) =>
              subj.id === res.id
                ? { ...subj, isActive: res.isActive }
                : subj
            )
          );
        },
        onError: (error) => {
          toast.error("Failed to update subject status: " + error.message);
        },
      }
    );
  };

  const handleAddSubject = (name, code) => {
    // Generate a simple id (ideally your backend should handle this)
    const newId = subjects.length
      ? Math.max(...subjects.map((s) => s.id)) + 1
      : 1;
    setSubjects((prev) => [...prev, { id: newId, name, code, isActive: true }]);
  };

  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">
          Subjects
        </h2>
        <div className="space-x-1">

        <Button variant='outline' onClick={() => navigate(-1)}>Back</Button>
        <Button onClick={() => setDialogOpen(true)}>Add Subject</Button>
        </div>
      </div>

      {/* Add Subject Dialog */}
      <AddSubjects
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSave={handleAddSubject}
        subjectName={subjectName}
        setSubjectName={setSubjectName}
        subjectCode={subjectCode}
        setSubjectCode={setSubjectCode}
      />

      {/* Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.code}
            name={subject.name}
            code={subject.code}
            isActive={subject.isActive}
            onToggle={(newState) => handleToggle(subject.code, newState)}
          />
        ))}
      </div>
    </section>
  );
}
