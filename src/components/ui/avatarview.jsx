import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function Avatarview({ src, fallBack = "AV" }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handelOpen = ()=>{
    if(src){
      setIsOpen(true)
    }
  }
  return (
    <div>
      <Avatar className='border size-9' onClick={handelOpen}>
        <AvatarImage className='object-cover' src={src} alt="ST" />
        <AvatarFallback>{fallBack}</AvatarFallback>
      </Avatar>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
      </DialogTrigger> */}
        <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-auto rounded-none ">
            <img src={src} className="w-full h-full object-cover object-center" alt="Student Image" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Avatarview;
