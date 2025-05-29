import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckmarkSquare01Icon } from 'hugeicons-react'
import React from 'react'

function FileDownload({title, desc, comp}) {
  return (
    <div className='w-full h-full'>
        <Card className='h-full'>
            <CardHeader className='relative'>

                <CardTitle>{title}</CardTitle>
                <CardDescription className='max-w-'>{desc}</CardDescription>
                <div className='absolute right-6 text-muted-foreground'>
                    <CheckmarkSquare01Icon/>
                </div>
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