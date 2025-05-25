import { Sad01Icon } from 'hugeicons-react'
import React from 'react'

function NoData() {
  return (
    <div>
      <div className="w-full min-h-32 flex flex-col justify-center items-center font-medium text-muted-foreground">
        <Sad01Icon size={30} strokeWidth={1} className='opacity-50' />
            No data found
        </div>
    </div>
  )
}

export default NoData
