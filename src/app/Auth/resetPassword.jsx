import { ResetOTP } from "@/components/auth/ResetOTP";
import { SubmitReset } from "@/components/auth/SubmitReset";
import { VerifyOTP } from "@/components/auth/VerifyOTP";
import React, { useState } from "react";
import logo from "@/assets/logo.svg";

function ResetPassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center ">
              <img src={logo} alt="" />
            </div>
            TSSR Council
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {step === 0 ? (
              <ResetOTP
                setEmail={setEmail}
                email={email}
                next={() => setStep(1)}
              />
            ) : step === 1 ? (
              <VerifyOTP setEmail={setEmail} email={email} setStep={setStep} />
            ) : (
              <SubmitReset setEmail={setEmail} email={email} />
            )}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://img.freepik.com/premium-photo/gluhbirnen-und-bucher-mit-doktorhut-konzept-des-bucherlesens-des-wissens-und-der-suche-nach-neuen-ideen-innovation-und-inspiration-kreativitat-mit-funkelnden-lichtern-die-inspiration-der-ideen_721781-1019.jpg?w=1000"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default ResetPassword;
