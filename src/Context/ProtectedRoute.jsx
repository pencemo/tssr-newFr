import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/loader';
import { useAuth } from './authContext';

function Protect({ children, requiredRole }) {
  const {user, setUser, loading} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Redirect if profile is not logged in or does not have the required role
      if (!user || !requiredRole.includes(user.role)) {
        navigate('/login'); // Change '/login' to your login route
      }
    }
  }, [loading, user, requiredRole, navigate]);

  if (loading) {
    return (
      <div className='w-full h-screen'>
        <Loader/>
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
