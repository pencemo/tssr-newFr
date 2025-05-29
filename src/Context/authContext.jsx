import { useGetUser, useSettings } from '@/hooks/tanstackHooks/useAuth'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

export const AuthContexP = createContext()

function AuthContext({children}) {
    const [user, setUser] = useState(null)
    const [settings, setSettings] = useState(null)
    const [loading, setLoading] = useState(true)
    const {data}=useGetUser()
    const {data: settingsData}=useSettings()

    useEffect(()=>{
        const getUser = async () => {
            if(data){
                if(data.success){
                    setUser(data.data)
                    console.log("User data:", data.data)
                    setLoading(false)
                }else{
                    setLoading(false)
                }
            }
        }
        const getSettings = async () => {
            if(settingsData && settingsData.success){
                setSettings(settingsData.data)
            }
        }
        getUser()
        getSettings()
    }, [data, settingsData])

  return (
    <AuthContexP.Provider value={{user, setUser, loading, settings, setSettings}} >
        {children}
    </AuthContexP.Provider>
  )
}

export default AuthContext

export const useAuth = () => {
    return useContext(AuthContexP)
}

export const useSettingsContext = () => {
    return useContext(AuthContexP)
}