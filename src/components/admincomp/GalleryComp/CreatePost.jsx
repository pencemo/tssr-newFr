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
import { Textarea } from "@/components/ui/textarea"
import { CloudUploadIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function CreatePost({data, setData, mutate, isEdit, isOpen, setOpen}) {
    const [image, setImage]=useState(null)
    const [error, setError]=useState(false)
    
    const [isLoading, setIsLoading]=useState(false)
    const handleFileUpload = (e) => {
        // Check if file size is greater than 1MB
        if(e.target.files[0].size > 1000000) {
            toast.error("File size is too large")
            e.target.files = ""
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

    const handleSubmit = () => {
        setIsLoading(true)
        if(data.title === "" || data.description === ""){
            setError(true)
            toast.error("Please fill all fields")
            return
        }
        mutate(data, {
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
                <label htmlFor="image" className="w-full border rounded-2xl border-gray-300 border-dashed p-6 hover:border-primary hover:bg-primary-foreground transition-all duration-200 cursor-pointer inline-flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-1.5">
                        <CloudUploadIcon size={30} strokeWidth={1.5} className="text-primary" />
                        <p className="text-xs text-gray-500">{image ? image.name :"Maximum file size is 1MB. Accepted: JPG, JPEG"}</p>
                    </div>
                </label>
                <input onChange={handleFileUpload} id="image" accept="image/*" className="sr-only" type="file" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input value={data.title} className={error && data.title === ""? "border-red-500": ""} onChange={handleChange} id="title" name="title" placeHolder="Title of post" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea value={data.description} className={error && data.description === ""? "border-red-500": ""} onChange={handleChange} id="description" name="description" placeHolder="Description" />
            </div>
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
