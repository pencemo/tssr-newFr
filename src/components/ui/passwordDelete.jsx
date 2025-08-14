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
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export function PasswordDelete({isOpen, setIsOpen, deleteFn, error, loading}) {
  const [password, setPassword] = useState('')

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
              <Label htmlFor="password">Enter Password</Label>
              <Input autoComplete="off" defaultValue="" id="password" placeholder="Password" type='password' onChange={(e)=> setPassword(e.target.value)} />
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
