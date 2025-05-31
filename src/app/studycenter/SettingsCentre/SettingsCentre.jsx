import AccountSettings from '@/components/admincomp/SettingsComp/AccountSettings'
import CenterDetailsEdit from '@/components/studycenterComponents/SettingsCompCenter/EditCenterDetails'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useSettings } from '@/hooks/tanstackHooks/useAuth'
import React, { useState } from 'react'

const tabs = ['Account Information', 'Center Details']

function SettingsCentre() {
    const [index, setIndex] = useState(0) 
    const {data}=useSettings()
    const comp = data?.data?.studyCenterUpdatePermission ? <CenterDetailsEdit/> : <NotPermission/>
    const items = [ <AccountSettings/>, comp ]
  return (
    <div className='w-full h-full max-w-[75rem]'>
        <Card className='w-full h-full shadow-none border-none'>
            <CardHeader className='p-0'>
                <CardTitle className='text-2xl'>Settings</CardTitle>
                <CardDescription>Manage your account and study center preferences.</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className='w-full h-full p-0'>
                <div className='md:grid w-full h-full md:grid-cols-10 gap-2'>
                    <div className='md:col-span-2 w-full'>
                        {tabs.map((item, i)=>{
                            return <div onClick={()=>setIndex(i)} key={i} className={`${index === i ? 'bg-gray-100' : ''} w-full py-2 px-4 text-sm font-medium rounded-md hover:bg-gray-100 cursor-pointer`}>{item}</div>
                        })}
                    </div>
                    <div className=' md:col-span-8 w-full h-full'>
                       {items[index]}
                       
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default SettingsCentre



function NotPermission() {
  return (
    <div className='w-full h-full border rounded-2xl flex flex-col justify-center items-center'>
      <div className='text-xl text-muted-foreground font-medium'>You are not authorized to access this page.</div>
    </div>
  )
}
