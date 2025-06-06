import { CreateNotification } from '@/components/admincomp/NotificationComp/CreateNotification'
import AllNotification from '@/components/studycenterComponents/NotificationComp/AllNotification'
import React from 'react'

function AdminNotifications() {
  return (
    <div className='w-full max-w-[65rem] mx-auto'>
        <div className='flex items-center justify-between mb-10'>
            <h1 className='text-2xl font-bold text-gray-800'>Notifications</h1>
            <CreateNotification/>
        </div>
        <AllNotification/>
    </div>
  )
}

export default AdminNotifications