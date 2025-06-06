import CentreDetails from '@/components/studycenterComponents/Dashboard/CentreDetails'
import DashbordCard from '@/components/studycenterComponents/Dashboard/DashbordCard'
import NotificationCard from '@/components/studycenterComponents/Dashboard/NotificationCard'
import React from 'react'
import logo from "../../../assets/logo.svg";
import { useDashboardDataOfCenter } from '@/hooks/tanstackHooks/useNotifications';
import Loader from '@/components/ui/loader';

function DashbordStudy() {
  const {data, error, isError, isLoading}=useDashboardDataOfCenter()

  if(error || isError) return <div>Error</div>
  if(isLoading) return <div className='w-full h-full'><Loader/></div>
  return (
    <div className='space-y-6'>
      <div className="mb-5 w-full  ">
        <div className="flex  gap-5 items-center">
          <img src={logo} className="w-24" alt="" />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#253a7c]">TSSR Council</h1>
            <p className="text-muted-foreground">Task manage applicatin</p>
          </div>
        </div>
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