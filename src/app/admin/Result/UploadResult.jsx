import ExcelDemoResult from '@/components/admincomp/ResultComp/ExcelDemoResult'
import Upload from '@/components/admincomp/ResultComp/Upload'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function UploadResult() {
    const navigate = useNavigate()
  return (
    <div>
        <Card className='max-w-3xl mx-auto'>
            <CardHeader>
                <CardTitle>
                    Upload Result
                </CardTitle>
                <CardDescription>
                    Upload result for a particular course
                </CardDescription>
                <CardAction>
                    <Button onClick={()=>navigate(-1)} variant='outline' size='icon'><ArrowLeft/></Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Upload/>
                <ExcelDemoResult/>
            </CardContent>
        </Card>
    </div>
  )
}

export default UploadResult