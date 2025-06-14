import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export function ResetOTP({ className, next, email, setEmail }) {

    const [error, setError]=useState(null)
    
    const handleSubmit = () => {
        setError(null)
        if(!email){
            setError("Email is required")
            toast.error("Email is required")
            return
        }
        next()
    }
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to reset to your password
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input className={error && email=== "" && 'border-red-500'} onChange={e=>setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Sent OTP
        </Button>

        <div className="text-center text-sm">
          Back to{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
