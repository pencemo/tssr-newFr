import CentreDetails from '@/components/studycenterComponents/Dashboard/CentreDetails'
import DashbordCard from '@/components/studycenterComponents/Dashboard/DashbordCard'
import NotificationCard from '@/components/studycenterComponents/Dashboard/NotificationCard'
import React from 'react'
import logo from "../../../assets/Logo.svg";
import { useDashboardDataOfCenter } from '@/hooks/tanstackHooks/useNotifications';
import Loader from '@/components/ui/loader';
import { useAuth } from '@/Context/authContext';

function DashbordStudy() {
  const {data, error, isError, isLoading}=useDashboardDataOfCenter()
  const {user}=useAuth()
  
  if(error || isError) return <div>Error</div>
  if(isLoading) return <div className='w-full h-full'><Loader/></div>
  return (
    <div className='space-y-6 w-full '>
      <div className='flex justify-be tween max-md: flex-col gap-2 w-full mb-5'>
      <div className="">
        <div className="flex  gap-3 items-center">
          <img src={logo} className="w-20 md:w-24" alt="" />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#253a7c]">TSSR Council</h1>
            <p className="text-muted-foreground">तकनीकी अध्ययन और कौशल अनुसंधान परिषद</p>
          </div>
        </div>
      </div>
      {/* <div className="">
        <div className="flex  gap-3 items-start">
          <img src={user?.studycenterId?.logo} className="w-20 md:w-24" alt="" />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#253a7c]">{user?.studycenterId?.name}</h1>
            <p className="text-muted-foreground">Task manage applicatin</p>
          </div>
        </div>
      </div> */}

      </div>
        <DashbordCard data={data?.data}/>
        <div className='grid md:grid-cols-10 gap-6'>
            <div className='md:col-span-7 w-ful h-full'>
                <CentreDetails/>
            </div>
            <div className='md:col-span-3 w-full h-full'>
                <NotificationCard/>
            </div>
        </div>
    </div>
  )
}

export default DashbordStudy