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
import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export function PasswordDelete({isOpen, setIsOpen, deleteFn, error, loading}) {
  const [password, setPassword] = useState('')
  const [isShow,setShow]=useState(true)

  useEffect(()=>{
    if(!isOpen) {setPassword('')}
    
  }, [isOpen])

  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Please entre password to confirm delete
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
              <Label htmlFor="pword">Enter Password</Label>
              <div className="relative">
              <Input autoComplete="new-password" defaultValue="" id="pword" name="pword" placeholder="Password" type={isShow ? "text":'password'} onChange={(e)=> setPassword(e.target.value)} />
              <div className="absolute right-4 text-neutral-700 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={()=>setShow(!isShow)}>
                {!isShow ? <ViewIcon size={18}/>: <ViewOffSlashIcon size={18}/>}
              </div>
              </div>
              {error&&<p className="text-red-500 text-sm">{error}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={()=>deleteFn(password)} >{loading ? <Loader2 className="animate-spin"/>:"Confirm Delete"}</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
  )
}
