import { useAuth } from "@/Context/authContext";
import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {  useUpdateInfoStudyCenter } from "@/hooks/tanstackHooks/useAuth";
import { Loader2 } from "lucide-react";
  import React, { useEffect, useState } from "react";
import { toast } from "sonner";
  
  function CenterDetailsEdit() {
    const [center, setCenter] = useState({
        name :  "",
        centerHead :  " ",
        email: "",
        phoneNumber :  "",
        district :  " ",
        place :  "",
        pincode :  "",
    });
    const {mutate, isPending}=useUpdateInfoStudyCenter()
    const {user}=useAuth()
    const [error, setError] = useState(null)
    
    useEffect(() =>{
      setCenter({
        name :  user.studycenterId.name || '',
        centerHead :  user.studycenterId.centerHead || ' ',
        email:  user.studycenterId.email || '',
        phoneNumber :   user.studycenterId.phoneNumber || '',
        district :   user.studycenterId.district || ' ',
        place :   user.studycenterId.place || '',
        pincode :   user.studycenterId.pincode || '',
      })
    }, [user])

    const handleChange = (e) => {
      setCenter({ ...center, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setError(null)
      mutate(center, {
        onSuccess: (data) => {
          if(data.success){
            toast.success(data.message)
          }else{
            setError(data.message)
            toast.error(data.message)
          }
        },
        onError: () => {
          setError('Something went wrong')
          toast.error('Something went wrong')
        }
      })
    }

    return (
      <div className="w-full h-full py-2 px-5 max-w-xl">
        <h1 className="text-2xl font-semibold">Centre Information</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Change Information related to stidy centre
        </p>
        <div className="mt-5 border-t pt-5">
          <div className="mt-3 space-y-6">
            <div className="space-y-2">
              <Label htmlFor='name' >Name of Center</Label>
              <Input id='name' name='name' onChange={handleChange} value={center.name} className="w-full" placeholder="Name of Center" />
              <p className="text-sm text-muted-foreground">The name will be changed all connetd data of study center like student and entrollment</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor='centerHead' >Name of Center Head</Label>
              <Input id='centerHead' name='centerHead' onChange={handleChange} value={center.centerHead} className="w-full" placeholder="Center Head" />
            </div>

            <div className="space-y-2">
              <Label htmlFor='email' >Email</Label>
              <Input id='email' value={center.email} className="w-full" placeholder="Email" />
              {/* <p className="text-sm text-muted-foreground">Can't change your email of your accout</p> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor='phoneNumber' >Phone Number</Label>
              <Input id='phoneNumber' onChange={handleChange} name='phoneNumber' value={center.phoneNumber} className="w-full" placeholder="Phone Number" />
            </div>
            <div className="space-y-2">
              <Label >Address</Label>
              <div className="grid md:grid-cols-3 gap-2">
                <Input onChange={handleChange} name='district' value={center.district} className="w-full" placeholder="District" />
                <Input onChange={handleChange} name='place' value={center.place} className="w-full" placeholder="Place" />
                <Input onChange={handleChange} name='pincode' value={center.pincode} className="w-full" placeholder="Pincode" />
                
              </div>
            </div>
            <div className="space-y-2">
              {error&&<p className="text-sm text-red-500">{error}</p>}
              <Button className='min-w-28' onClick={handleSubmit}>{isPending ? <Loader2 className="animate-spin"/> :"Update Center"}</Button>
            </div>

            
  
          </div>
        </div>
      </div>
    );
  }
  
  export default CenterDetailsEdit;
  