import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckmarkSquare01Icon, FileValidationIcon } from 'hugeicons-react'
import React from 'react'

function FileDownload({title, desc, comp}) {
  return (
    <div className='w-full h-full'>
        <Card className='h-full'>
            <CardHeader className='relative'>

                <CardTitle>{title}</CardTitle>
                <CardDescription className=' '>{desc}</CardDescription>
                <CardAction>
                    <FileValidationIcon className='text-muted-foreground' size={20}/>
                </CardAction>
            </CardHeader>
            <CardContent>
                
            </CardContent>
            <CardFooter>
                {/* <FileDlPopup/> */} 
                {comp}
            </CardFooter>
        </Card>
    </div>
  )
}

export default FileDownload