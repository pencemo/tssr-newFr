import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "hugeicons-react";
import { useState } from "react";
import { toast } from "sonner";
import { useResetPassword } from "@/hooks/tanstackHooks/useAuth";
import { Loader2Icon } from "lucide-react";

export function SubmitReset({ className ,email }) {
    const [isShow, setShow]=useState(false)
    const [newPassword, setNewPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")
  const [error, setError] = useState(null)
  const { mutate, isPending } = useResetPassword();
  const navigate = useNavigate();

    const handleSubmit=()=>{
      setError(null)
        if(!newPassword || !confirmPassword){
            setError("Please fill all fields")
            toast.error("Please fill all fields")
            return
        }
        if(newPassword!==confirmPassword){
            setError("Password does not match")
            toast.error("Password does not match")
            return
        }
        
        if(confirmPassword.length<8){
            setError("Password must be at least 8 characters long")
            toast.error("Password must be at least 8 characters long")
            return
      }
      mutate(
        { email,newPassword },
        {
          onSuccess: (res) => {
            if (res.success) {
              toast.success(res.message);
              navigate('/login')
            } else {
              toast.error(res.message);
            }
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        }
      );
    }
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Set New Password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your new password to reset password.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="newPassword"
            type="text"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            className={`${error && newPassword === "" ? "border-red-500" : ""}`}
            required
          />
          <div className="relative">
            <Input
              id="password"
              type={isShow ? "text" : "password"}
              placeholder="Repeat Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${
                error &&
                (confirmPassword === "" || error === "Password does not match")
                  ? "border-red-500"
                  : ""
              }`}
              required
            />
            <div
              onClick={() => setShow(!isShow)}
              className="absolute text-muted-foreground hover:text-primary cursor-pointer right-3 top-[50%] translate-y-[-50%]"
            >
              {!isShow ? <ViewIcon size={20} /> : <ViewOffIcon size={20} />}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <Button onClick={handleSubmit} className="w-full">
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Change Password"
          )}
        </Button>

        <div className="text-center text-sm">
          Bakc to{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
