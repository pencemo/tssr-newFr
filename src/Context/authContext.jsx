import { useGetUser, useSettings } from '@/hooks/tanstackHooks/useAuth'
import { useAllNotifications } from '@/hooks/tanstackHooks/useNotifications'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

export const AuthContexP = createContext()

function AuthContext({children}) {
    const [user, setUser] = useState(null)
    const [notificationCount, setNotificationCount]=useState(0)
    const [loading, setLoading] = useState(true)
    const {data}=useGetUser()
    const {data: notificationsData}=useAllNotifications()

    useEffect(()=>{
        const getUser = async () => {
            if(data){
                if(data.success){
                    setUser(data.data)
                    setLoading(false)
                }else{
                    setLoading(false)
                }
            }
        }
        
        getUser()
    }, [data])

    useEffect(()=>{
        const savedCount = window.localStorage.getItem('notificationCount') || 0

        const setNotification = async () => {
            if(notificationsData && notificationsData.success){
                const newNotificationsCount = notificationsData?.data?.length - savedCount
                setNotificationCount(newNotificationsCount)
            }
        }
        
        setNotification()
    }, [notificationsData])



  return (
    <AuthContexP.Provider value={{user, setUser, loading, notificationCount, setNotificationCount}} >
        {children}
    </AuthContexP.Provider>
  )
}

export default AuthContext

export const useAuth = () => {
    return useContext(AuthContexP)
}

export const useNotificationCount = () => {
    return useContext(AuthContexP)
}

