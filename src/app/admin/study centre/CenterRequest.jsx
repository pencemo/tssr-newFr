import { ATCreqTable } from '@/components/admincomp/studycenComp/ATCreqTable'
import { useGetRequestCenter, useUpdateSutdyCenterRequest } from '@/hooks/tanstackHooks/useStudyCentre'
import React, { useState } from 'react'
import { AccepteModel } from './AccepteModel'
import { Alert } from '@/components/ui/Alert'
import { toast } from 'sonner'

function CenterRequest() {
    const [isAcceptModelOpen, setIsAcceptModelOpen]=useState(false)
    const [isRejectModelOpen, setIsRejectModelOpen]=useState(false)
    const [selectedId, setSelectedId]=useState(null)
    const {data}=useGetRequestCenter()

    const handleAccept=(id)=>{
      setIsAcceptModelOpen(true)
      setSelectedId(id)
    }

    const handleReject=(id)=>{
      setIsRejectModelOpen(true)
      setSelectedId(id)
    }

    const {mutate}=useUpdateSutdyCenterRequest()

  const handleSubmit = async () => {
    if(!selectedId){
      return toast.error("Please select a study center")
    }

    const data = {id: selectedId, status: "rejected"}
    mutate(data, {
      onSuccess: (data) => {
        if(data.success){
          toast.success(data.message)
          isRejectModelOpen(false)
        }else{
          toast.error(data.message)
        }
      }
    })
  }
  return ( 
    <div>
      <div>
        <h1 className='text-2xl font-bold text-gray-700'>ATC Requests</h1>
      </div>
      <div className='border rounded-xl overflow-hidden mt-6'>
        <ATCreqTable onAccept={handleAccept} onReject={handleReject}  data={data?.data || []}/>
        <AccepteModel selectedId={selectedId} isOpen={isAcceptModelOpen} setOpen={setIsAcceptModelOpen}/>
        <Alert deleteFn={handleSubmit} isOpen={isRejectModelOpen}  setIsOpen={setIsRejectModelOpen} discription={"Are you sure you want to reject this study center request?. This action cannot be undone and delete data from database..!"}/>
      </div>
    </div>
  )
}

export default CenterRequest
