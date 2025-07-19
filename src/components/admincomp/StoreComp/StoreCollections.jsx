import React, { useState } from 'react'
import ItemCard from './ItemCard'
import { EditProduct } from './EditProduct'


function StoreCollections({data}) {
  const [edit, setEdit]=useState(null)
  const [isOpen, setOpen]=useState(false)

  const handleSelectEdit = (item) =>{
    setEdit(item)
    setOpen(true)
  }

  return (
    <>
    <div className='mt-10 grid grid-cols-4 gap-4'>
      {data.map((item, i) =>{
        return <ItemCard key={i} setEdit={handleSelectEdit} item={item} />
      })}
    </div>
    <EditProduct edit={edit} isOpen={isOpen} setOpen={setOpen} />
    </>
  )
}

export default StoreCollections