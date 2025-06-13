import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useSettings, useToggleSettings } from "@/hooks/tanstackHooks/useAuth";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function GenarelSettings() {
  const [settings, setSettings]=useState({
    reportsDownload: true,
    admissionPermission: true,
    wholeAppLoginPermission: true,
    studyCenterUpdatePermission: true
  })
  const {data, isLoading}=useSettings()
  useEffect(()=>{
    if(data.data){
      setSettings(data.data)
    }
    // console.log(data);
  }, [data])

  const {mutate}=useToggleSettings()

  const handleToggle=(key)=>{
    setSettings(prev=>({...prev,[key]:!prev[key]}))
    mutate({key},{
      onSuccess:(data)=>{
        if(data.success){
          toast.success(data.message)
        }
      }
    })
  }

  if(isLoading) return <div>Loading...</div>

  return (
    <div className="w-full h-full py-2 px-5 max-w-xl">
      <h1 className="text-2xl font-semibold">Access Management</h1>
      <p className="text-sm text-muted-foreground mt-1">
      Control access to specific features of the study centers.
      </p>
      <div className="mt-5 border-t pt-5">
        <div className="mt-6 space-y-4">

          <Card className="px-6 shadow-none ">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle>Download Access</CardTitle>
                <CardDescription>
                Allow or restrict access to downloadable documents.
                </CardDescription>
              </div>
              <Switch checked={settings?.reportsDownload} onCheckedChange={()=>handleToggle('reportsDownload')} className="cursor-pointer" />
            </div>
          </Card>

          <Card className="px-6 shadow-none max-w-xl">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle>Login Access</CardTitle>
                <CardDescription>
                Manage user login permissions for the study center.
                </CardDescription>
              </div>
              <Switch checked={settings?.wholeAppLoginPermission} onCheckedChange={()=>handleToggle('wholeAppLoginPermission')} className="cursor-pointer" />
            </div>
          </Card>

          <Card className="px-6 shadow-none max-w-xl">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle>Admission Permissions</CardTitle>
                <CardDescription>
                Control access to student admission functionalities.
                </CardDescription>
              </div>
              <Switch checked={settings?.admissionPermission} onCheckedChange={()=>handleToggle('admissionPermission')} className="cursor-pointer" />
            </div>
          </Card>

          <Card className="px-6 shadow-none max-w-xl">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle>Edit Info Permission</CardTitle>
                <CardDescription>
                Control access to edti details of study center.
                </CardDescription>
              </div>
              <Switch checked={settings?.studyCenterUpdatePermission} onCheckedChange={()=>handleToggle('studyCenterUpdatePermission')} className="cursor-pointer" />
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default GenarelSettings;
