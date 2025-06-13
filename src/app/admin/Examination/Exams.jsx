import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ScheduledExams } from '@/components/admincomp/ExamComp/ScheduledExam';

function Exams() {
    const navigate = useNavigate()
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>All Exams</h1>
        <Button onClick={()=>navigate('create')}>New Exam</Button>
      </div>
      <div>
      <ScheduledExams />
      </div>
    </div>
  )
}

export default Exams
