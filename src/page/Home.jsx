import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
  return (
    <div className='w-full h-screen grid place-content-center gap-4'>
      <Button onClick={()=>navigate('/admin')}>Admin </Button>
      <Button onClick={()=>navigate('/studycenter')}>StudyCentre</Button>
    </div>
  )
}

export default Home
