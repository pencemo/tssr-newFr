import { useGetUser } from '@/hooks/tanstackHooks/useAuth'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

export const AuthContexP = createContext()

function AuthContext({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const {data}=useGetUser()
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
        getUser()
    }, [data])

  return (
    <AuthContexP.Provider value={{user, setUser, loading}} >
        {children}
    </AuthContexP.Provider>
  )
}

export default AuthContext

export const useAuth = () => {
    return useContext(AuthContexP)
}