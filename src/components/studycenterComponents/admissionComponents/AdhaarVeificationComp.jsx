"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckEnrolledOrNot } from "@/hooks/tanstackHooks/useEnrollment";
import { Loader } from "lucide-react";

const AdhaarVeificationComp = ({
  setStep,
  setUserData,
}) => {
  const [adhaarNumber, setAdhaarNumber] = useState("");
  const { mutate ,isPending } = useCheckEnrolledOrNot();


  const handleCheck = () => {
    if (adhaarNumber.trim().length === 12) {
      mutate(
        { adhaarNumber },
        {
          onSuccess: (res) => {
            const data = res?.data;
            if (!data) {
              toast.error("Invalid response from server.");
              return;
            }

            const { studentExists, enrolled, student } = data;

            if (studentExists && enrolled) {
              // ✅ Case 1: Student found and already enrolled in some courses
              toast("Student is already enrolled in a course.", {
                description: "Adhaar Verified",
              });
            } else if (
              studentExists && !enrolled
            ) {
              // ✅ Case 2: Student exists but not enrolled in any course
              toast("Proceed to New ENrollment.", {
                description: "Adhaar Verified .",
              });
              setUserData(student);
              setStep(3);
            } else {
              // ✅ Case 3: New student
              toast("New student. Please proceed with admission.", {
                description: "New student. Please proceed with admission.",
              });
              setUserData({ adhaarNumber });
              setStep(2);
            }
          },
          onError: () => {
            toast.error("Error", {
              description: "Failed to check enrollment status",
            });
          },
        }
      );
    } else {
      toast.error("Invalid Aadhaar", {
        description: "Please enter a valid 12-digit Aadhaar number",
      });
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify Aadhaar</CardTitle>
          <CardDescription className="text-base">
            Check student enrollment using Aadhaar number
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="adhaar" className="text-base">
                Aadhaar Number
              </Label>
              <Input
                id="adhaar"
                placeholder="Enter 12-digit Aadhaar number"
                value={adhaarNumber}
                onChange={(e) => setAdhaarNumber(e.target.value)}
                maxLength={12}
                className="h-12 text-base"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setAdhaarNumber("")}
            className="flex-1 h-12 text-base"
          >
            Clear
          </Button>
          <Button onClick={handleCheck} className="flex-1 h-12 text-base">
            {isPending ? <Loader className="animate-spin" /> :
              "Verify & Continue"
            }
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdhaarVeificationComp;
