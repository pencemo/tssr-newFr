import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function ImageCard({data, onEdit, onDelete}) {
    
  return (
    <Card className='pt-0 overflow-hidden'>
      <img className='w-full h-48 object-cover border-b' src={data.image} alt={data.title} />
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardFooter className='space-x-2'>
        <Button size="sm" variant='outline' onClick={() => onEdit(data)}>Edit Post</Button>
        <Button size="sm" variant='destructive' onClick={()=>onDelete(data._id)} >Delete </Button>
      </CardFooter>
    </Card>
  )
}

export default ImageCard