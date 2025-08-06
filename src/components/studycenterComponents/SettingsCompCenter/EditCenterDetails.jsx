import { useAuth } from "@/Context/authContext";
import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {  useUpdateInfoStudyCenter } from "@/hooks/tanstackHooks/useAuth";
import { deleteByUrl, useFirebaseUpload } from "@/hooks/useFirebaseUpload";
import { Delete01Icon, Upload04Icon } from "hugeicons-react";
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
    const { uploadFile, progress, uploading, error: uploadError } = useFirebaseUpload();
    const [file, setFile] = useState(null)
    const {user}=useAuth()
    const [isLoading, setLoading]=useState(false)
    const [error, setError] = useState(null)

    const handleFileUpload = (e) => {
      const { files } = e.target;
  
      if (files && files[0]) {
        if (files[0].size > 1048576) {
          toast.error("File size should be less than 1MB")
          e.target.value = "";
          return;
        }
  
        setFile(files[0]);
      }
    };
    
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
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null)
      setLoading(true)

      if(file){
        var { url } = await uploadFile({
          file: file,
          path: "logo",
        });
  
        if(!url){
          toast.error("Failed to upload profile image.")
          setLoading(false)
          return
        }
      }
      mutate({...center, logo: url || user.studycenterId.logo}, {
        onSuccess: (data) => {
          if(data.success){
            toast.success(data.message)
            setLoading(false)
          }else{
            setError(data.message)
            setLoading(false)
            toast.error(data.message)
          }
        },
        onError: () => {
          setError('Something went wrong')
          toast.error('Something went wrong')
          setLoading(false)
        }
      })
    }

    const handldeDlelete = async() => {
      if(user.studycenterId.logo){
        await deleteByUrl(user.studycenterId.logo)
        mutate({...user.studycenterId, logo: ""}, {
          onSuccess: (data) => {
            if(data.success){
              toast.success(data.message)
            }else{
              toast.error(data.message)
            }
          },
          onError: () => {
            toast.error('Something went wrong')
          }
        }
        )
      }else{
        toast.error("No image to delete")
      }
    }

    const imgae = file ? URL.createObjectURL(file) : user.studycenterId.logo || ""

    return (
      <div className="w-full h-full py-2 px-5 max-w-xl">
        <h1 className="text-2xl font-semibold">Centre Information</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Change Information related to stidy centre
        </p>
        <div className="mt-5 border-t pt-5">
          <div className="mt-3 space-y-6">
          <div className="flex max-md:flex-col md:items-end gap-2 py-3 ">
        <div className="size-28 border rounded-full overflow-hidden">
                <img
                  src={imgae}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
        <div className="flex flex-col items-start">
                <input
                  onChange={handleFileUpload}
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                />
                <div className="flex gap-2 items-center">
                <label
                  htmlFor="profileImage"
                  className={`border py-2 px-3 inline-flex gap-1 items-center rounded-md cursor-pointer text-sm font-medium  `}
                >
                  <Upload04Icon size={20} /> Upload Logo
                </label>
                <Button onClick={handldeDlelete} variant='outline' size='icon' className='border-red-200 hover:bg-red-500 hover:text-white duration-200 cursor-pointer text-red-500' >
                  <Delete01Icon/>
                </Button>

                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum file size is 1MB. Accepted: JPG, JPEG
                </p>
                
              </div>
        </div>
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
              <Button className='min-w-28' onClick={handleSubmit}>{isPending || isLoading? <Loader2 className="animate-spin"/> :"Update Center"}</Button>
            </div>

            
  
          </div>
        </div>
      </div>
    );
  }
  
  export default CenterDetailsEdit;
  