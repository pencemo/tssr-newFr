import { useGetUser } from '@/hooks/tanstackHooks/useAuth'
import { useAllNotifications } from '@/hooks/tanstackHooks/useNotifications'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import logo from '../assets/logo.svg'

export const AuthContexP = createContext()

function AuthContext({children}) {
    const [user, setUser] = useState(null)
    const [notificationCount, setNotificationCount]=useState(0)
    const [loading, setLoading] = useState(true)
    const {data}=useGetUser()
    const {data: notificationsData}=useAllNotifications()

    useEffect(()=>{
        if(data){
            if(data.success){
                setUser(data.data)
            }
            setLoading(false)
        }
    }, [data])

    function requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission() 
        } else {
            console.log('This browser does not support desktop notifications.');
        }
    }

    function sendNotification(title, options = {}) {
        if (Notification.permission === 'granted') {
            new Notification(title, options);
        }
    }

    useEffect(()=>{
        const savedCount = window.localStorage.getItem('notificationCount')
        const setNotification = async () => {
            if(notificationsData && notificationsData.success){
                if(savedCount){
                    const newNotificationsCount = notificationsData?.data?.length - savedCount
                    setNotificationCount(newNotificationsCount)
                    if(newNotificationsCount > 0){
                        sendNotification('New notifications', {
                            body: `You have received ${newNotificationsCount} new notifications.`,
                            icon: logo,
                        });
                    }
                }else{
                    window.localStorage.setItem('notificationCount', notificationsData?.data?.length)
                }
            }
            
        }
        
        requestNotificationPermission()
        setNotification()
       

    }, [notificationsData])

    const value = React.useMemo(
        () => ({ user, setUser, loading, notificationCount, setNotificationCount }),
        [user, loading, notificationCount]
      );

  return (
    <AuthContexP.Provider value={value} >
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

