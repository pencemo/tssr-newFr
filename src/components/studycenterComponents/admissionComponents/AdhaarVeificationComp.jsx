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
  onNext,
  onBack,
  onFinel,
  setUserData,
}) => {
  const [adhaarNumber, setAdhaarNumber] = useState("");
  const { mutate ,isPending } = useCheckEnrolledOrNot();


  const handleCheck = () => {
    if (adhaarNumber.trim().length === 14) {
      const cleanAadhaar = adhaarNumber.replace(/\D/g, '');
      mutate(
        { cleanAadhaar },
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
              toast.error("Student is already enrolled in a course.");
            } else if (
              studentExists && !enrolled
            ) {
              // ✅ Case 2: Student exists but not enrolled in any course
              toast.success("Proceed to New Enrollment." );
              setUserData(student);
              onFinel();
            } else {
              // ✅ Case 3: New student
              toast.success("New student. Please proceed with admission.");
              setUserData({ adhaarNumber });
              onNext();
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
      toast.warning("Invalid Aadhaar", {
        description: "Please enter a valid 12-digit Aadhaar number",
      });
    }
  };
  

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
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
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                      
                      // Add space every 4 digits
                      if (value.length > 0) {
                        value = value.match(/.{1,4}/g)?.join(' ') || '';
                      }
                  setAdhaarNumber(value)
                }}
                maxLength={14}
                className="h-11 text-base"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2 px-6 ">
          <Button
            variant="outline"
            onClick={() => onBack()}
          >
            Back
          </Button>
          <Button onClick={handleCheck}  >
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
