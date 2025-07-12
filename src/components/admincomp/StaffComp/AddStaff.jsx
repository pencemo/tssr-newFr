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
import { useState } from "react"
import { HiOutlinePlus } from "react-icons/hi2"

export function AddStaff({formData, setFormData}) {
    

    const handelChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
    }
  return (
    <Dialog className='w-full'>
      <form>
        <DialogTrigger asChild>
          <Button className={' w-full '}>Add Staff <HiOutlinePlus strokeWidth={2}/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Staff Data</DialogTitle>
            <DialogDescription>
              Fill in the form below to add a new staff data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input onChange={handelChange} id="name" name="name"  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input onChange={handelChange} id="email" name="email" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
