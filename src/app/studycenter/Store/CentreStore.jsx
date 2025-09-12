import ProductCard from '@/components/studycenterComponents/StoreComp/ProductCard';
import { Button } from '@/components/ui/button';
import { useAllProduct } from '@/hooks/tanstackHooks/useProducts';
import { Loader } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function CentreStore() {
    const {data, isLoading, isError}=useAllProduct()
    const navigate=useNavigate()
    return (
      <div>
          <div className='flex  justify-between items-center max-md:flex-col'>
              <h1 className='text-2xl font-bold'>Store Collection</h1>
              <Button onClick={()=>navigate("/studycenter/store/myorders")}>My orders</Button>
          </div>
          {isLoading ? <div className='w-full h-full'><Loader/></div>:
        <div className='grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
            {data?.products?.map((item, i)=>{
                return <ProductCard key={i} item={item} />
            })}
        </div>
          }
      </div>
    )
}

export default CentreStore