import AllNotification from '@/components/studycenterComponents/NotificationComp/AllNotification'
import React from 'react'

function CenterNotification() {
  return (
    <div className='w-full max-w-[65rem] mx-auto'>
        <div className='mb-10'>
            <h1 className='text-2xl font-bold'>Notifications</h1>
        </div>
        <AllNotification/>
    </div>
  )
}

export default CenterNotification