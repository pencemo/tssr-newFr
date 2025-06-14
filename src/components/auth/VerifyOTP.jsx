import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

export function VerifyOTP({ className, setStep }) {
    const [otp, setOtp]=useState('')
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <div className="flex flex-col items-center  gap-2 text-center">
        <h1 className="text-2xl font-bold">Submit OTP</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Check your email for the OTP code and enter it below to continue.
        </p>
      </div>
      <div className="grid gap-2 w-full justify-center">
        <div className="grid gap-3">
          {/* <Label htmlFor="email">Email</Label> */}
          <InputOTP value={otp} onChange={(value) => setOtp(value)} className="w-full" maxLength={6}>
            <InputOTPGroup >
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup >
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button disabled={otp.length !== 6} onClick={() => setStep(2)} className="w-full mt-4">
          Verify OTP
        </Button>

        <Button
          variant="ghost"
          onClick={() => setStep(0)}
          className="text-center text-sm"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
