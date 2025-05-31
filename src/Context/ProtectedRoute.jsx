import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/loader';
import { useAuth } from './authContext';
import { useSettings } from '@/hooks/tanstackHooks/useAuth';

function Protect({ children, requiredRole }) {
  const {user, loading} = useAuth();
  const navigate = useNavigate();
  const {data, isLoading}=useSettings()

  const isAccess = data?.data?.wholeAppLoginPermission
  
  useEffect(() => {
    if (!loading) {
      // Redirect if profile is not logged in or does not have the required role
      if (!user || !requiredRole.includes(user.role)) {
        navigate('/login'); // Change '/login' to your login route
      }
    }
  }, [loading, user, requiredRole, navigate]);

  if (loading || isLoading) {
    return (
      <div className='w-full h-screen'>
        <Loader/>
      </div>
    );
  }

  if(!user?.isAdmin && !isAccess){
    return (
      <div className='w-full h-screen flex items-center justify-center flex-col'>
        <img className='w-[400px]' src="https://assets-v2.lottiefiles.com/a/468b83f6-1180-11ee-b1e9-0749619e88a1/LPpXfUQxVa.gif" alt="" />
        <span className="font-medium text-muted-foreground">Under Maintenance </span>
      </div>
    );
  }
 

  if (user) {
    if(!user.isVerified){
      return (
        <div className='w-full h-screen grid place-content-center'>
          <span className="text-lg text-foreground">Account not verified</span>
        </div>
      );
    }else if(!user.isActive){
      return (
        <div className='w-full h-screen grid place-content-center'>
          <span className="text-lg text-foreground">Account not activated</span>
        </div>
      );

    }else{
      requiredRole.includes(user.role) ? children : null;
    }
  }

  // If profile is authenticated and has the required role, render the children
  return user && requiredRole.includes(user.role) ? children : null;
}

export default Protect;
