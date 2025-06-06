import { useAuth } from "@/Context/authContext";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Switch } from "@/components/ui/switch";
  import { useSettings, useUpdateInfo } from "@/hooks/tanstackHooks/useAuth";
import { Loader2 } from "lucide-react";
  import React, { useEffect, useState } from "react";
import { toast } from "sonner";
  
  function AccountSettings() {
    const [userData, setUserData] = useState({
      name: '',
      oldPassword: '',
      newPassword: '',
      phoneNumber: ''
    });
    const {mutate, isPending}=useUpdateInfo()
    const {user}=useAuth()
    const [error, setError] = useState(null);
    
    useEffect(() =>{
      setUserData(user)
    }, [user])

    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setError(null)
      mutate(userData, {
        onSuccess: (data) => {
          if(data.success){
            toast.success(data.message)
          }else{
            toast.error(data.message)
            setError(data.message)
          }
        },
        onError: (error) => {
          if(error){
            toast.error('Somthing went wrong')
            setError('Somthing went wrong')
          }
        }
      })
    }

    return (
      <div className="w-full h-full py-2 px-5 max-w-xl">
        <h1 className="text-2xl font-semibold">Account Information</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Change Information related to your account.
        </p>
        <div className="mt-5 border-t pt-5">
          <div className="mt-3 space-y-8">
            <div className="space-y-2">
              <Label htmlFor='name' >Username</Label>
              <Input id='name' name='name' onChange={handleChange} value={userData.name} className="w-full" placeholder="Username" />
              <p className="text-sm text-muted-foreground">User name of the account holder</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor='email' >Email</Label>
              <Input id='email' value={userData.email} disabled className="w-full" placeholder="Email" />
              <p className="text-sm text-muted-foreground">Can't change email of your accout</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor='phoneNumber' >Phone Nubmer</Label>
              <Input id='phoneNumber' onChange={handleChange} name='phoneNumber' value={userData.phoneNumber} className="w-full" placeholder="Phone Nubmer" />
              {/* <p className="text-sm text-muted-foreground"></p> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor='password' >Password</Label>
              <Input id='password' name='oldPassword' onChange={handleChange} value={userData.oldPassword} className="w-full" placeholder="Old Password" />
              <Input  name='newPassword' onChange={handleChange} value={userData.newPassword} className="w-full" placeholder="New Password" />
              <p className="text-sm text-muted-foreground">For change password type your old and new pssword</p>
            </div>
            <div className="space-y-2">
            {error&&<p className="text-sm text-red-500">{error}</p>}
              <Button onClick={handleSubmit}>{isPending ? <Loader2 className="animate-spin"/> :"Update Account"}</Button>
              {/* <p className="text-sm text-muted-foreground">For change password type your old and new pssword</p> */}
            </div>

            
  
          </div>
        </div>
      </div>
    );
  }
  
  export default AccountSettings;
  