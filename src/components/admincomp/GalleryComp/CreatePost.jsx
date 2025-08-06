import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useFirebaseUpload } from "@/hooks/useFirebaseUpload"
import { Delete01Icon } from "hugeicons-react"
import { CloudUploadIcon, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function CreatePost({data, setData, mutate, isEdit, isOpen, setOpen}) {
    const [image, setImage]=useState(null)
    const [error, setError]=useState(false)
    const { uploadFile, progress, uploading, error: uploadError } = useFirebaseUpload();

    useEffect(()=>{
      if(!isOpen){
        setData({title: "", description: "", image: ""})
        setError(false)
        setImage(null)
      }

    }, [isOpen])
    
    const [isLoading, setIsLoading]=useState(false)
    const handleFileUpload = (e) => {
        // Check if file size is greater than 1MB
        if(e.target.files[0].size > 1000000) {
            toast.error("File size is too large")
            e.target.value = ""
            return
        }
        setImage(e.target.files[0])
    }

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleCancel = () => {
        setData({title: "", description: "", image: ""})
        setError(false)
        setImage(null)
        setOpen(false)
    }

    const handleSubmit = async() => {
        setIsLoading(true)
        if(data.title === "" || data.description === ""){
            setError(true)
            toast.error("Please fill all fields")
            return
        }
        if(image){
          var { url, fullPath } = await uploadFile({
            file: image,
            path: "gallery",
          });
    
          if(!url){
            setIsLoading(false)
            toast.error("Failed to upload profile image.")
            return
          }
        }

        mutate({...data, image: image ? url : data.image}, {
            onSuccess: (data) => {
                if(data.success){
                    toast.success(data.message)
                    handleCancel()
                }else{
                    toast.error(data.message)
                }
            }
        })
        setIsLoading(false)
    }

    const imgUrl = image ? URL.createObjectURL(image) : data.image ? data.image : ""
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button >Crate Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Post" : "New Post"}</DialogTitle>
            <DialogDescription>
              Upload image and enter title and discription for new post
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <div >
                {image || data.image?
                <div className="w-full border rounded-2xl relative h-28 transition-all duration-200 group inline-flex items-center justify-center">
                  {image&&<div className="absolute inset-0 w-full h-full transition-all opacity-0 group-hover:opacity-100 bg-black/50 rounded-2xl flex items-center justify-center">
                    <div onClick={()=>setImage(null)} className="p-2 cursor-pointer rounded-full bg-white"><Delete01Icon size={16}/></div>
                  </div>}
                  <img className="w-full h-full object-cover rounded-2xl" src={imgUrl} alt="" />
                </div>
                :<label htmlFor="image" className="w-full border rounded-2xl border-gray-300 border-dashed p-6 hover:border-primary hover:bg-primary-foreground transition-all duration-200 cursor-pointer inline-flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-1.5">
                        <CloudUploadIcon size={30} strokeWidth={1.5} className="text-primary" />
                        <p className="text-xs text-gray-500">{image ? image.name :"Maximum file size is 1MB. Accepted: JPG, JPEG"}</p>
                    </div>
                </label>
                }
                <input onChange={handleFileUpload} id="image" accept="image/*" className="sr-only" type="file" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input value={data.title} className={error && data.title === ""? "border-red-500": ""} onChange={handleChange} id="title" name="title" placeholder="Title of post" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea value={data.description} className={error && data.description === ""? "border-red-500": ""} onChange={handleChange} id="description" name="description" placeholder="Description" />
            </div>
            {uploading&& <Progress value={progress} className="w-full bg-accent" />}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleCancel} variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>{isLoading ? <Loader2 className="animate-spin"/>:isEdit? "Save changes":"Crate Post"}</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
