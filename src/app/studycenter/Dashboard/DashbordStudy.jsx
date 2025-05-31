import CentreDetails from '@/components/studycenterComponents/Dashboard/CentreDetails'
import DashbordCard from '@/components/studycenterComponents/Dashboard/DashbordCard'
import NotificationCard from '@/components/studycenterComponents/Dashboard/NotificationCard'
import React from 'react'

function DashbordStudy() {
  return (
    <div className='space-y-6'>
        <DashbordCard data={[130, 4560, 260, 30]}/>
        <div className='grid md:grid-cols-10 gap-6'>
            <div className='col-span-7 w-ful h-full'>
                <CentreDetails/>
            </div>
            <div className='col-span-3 w-full h-full'>
                <NotificationCard/>
            </div>
        </div>
    </div>
  )
}

export default DashbordStudy