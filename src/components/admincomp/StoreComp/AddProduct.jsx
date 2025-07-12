import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useCourseOfStudyCenter } from "@/hooks/tanstackHooks/useStudyCentre";
import { useAddProduct } from "@/hooks/tanstackHooks/useProducts";
import { toast } from "sonner";

export function AddProduct() {
  const {data}=useCourseOfStudyCenter()
  const [isOpen, setOpen]=useState(false)
  const [error,setError]=useState(null)
  const {mutate}=useAddProduct()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    course: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleCancel = () => {
    setOpen(false)
    setError(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      course: "",
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null)
    if(!formData.name || !formData.description || !formData.price){
      return setError("Please fill all the fields")
    }
    mutate(formData, {
      onSuccess: (data) => {
        if(data.success){
          handleCancel()
          setOpen(false)
          toast.success(data.message)
        }else{
          setError(data.message)
          toast.error(data.message)
        }
      },
      onError: (error) => {
        setError(error.message)
        toast.error(error.message)
      }
    }
    )
  }

  useEffect(()=>{
    if(!isOpen){
      handleCancel()
    }
  }, [isOpen])
  return (
    <Dialog open={isOpen} onOpenChange={setOpen} >
      <form>
        <DialogTrigger asChild>
          <Button>Add Product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add product</DialogTitle>
            <DialogDescription>
              Add a new product to the store.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="name-1">Name</Label>
              <Input value={formData.name} onChange={handleChange} className={`${error && 'border-red-500'}`} id="name-1" name="name" placeholder="Product Name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dics">Cource</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, course: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Courses</SelectLabel>
                    {data && data.data.map((item, i)=>{
                      return <SelectItem value={item.courseId}>{item.courseName}</SelectItem>
                    })}
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dics">Description</Label>
              <Input value={formData.description} onChange={handleChange} className={`${error && 'border-red-500'}`} id="dics" name="description" placeholder="Description" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input type='number' value={formData.price} onChange={handleChange} className={`${error && 'border-red-500'}`} id="price" name="price" placeholder="Price" />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleCancel} variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
