import { AddProduct } from '@/components/admincomp/StoreComp/AddProduct'
import StoreCollections from '@/components/admincomp/StoreComp/StoreCollections'
import Loader from '@/components/ui/loader'
import { useAllProduct } from '@/hooks/tanstackHooks/useProducts'
import React from 'react'

function Store() {
  const {data, isLoading, isError}=useAllProduct()
  return (
    <div className='w-full h-full'>
        <div className='flex  justify-between items-center max-md:flex-col'>
            <h1 className='text-2xl font-bold'>Store Collection</h1>
            <AddProduct/>
        </div>
        {isLoading ? <div className='w-full h-full'><Loader/></div>:
        <StoreCollections data={data?.products}/>
        }
    </div>
  )
}

export default Store