import React, { useState, useEffect } from 'react'
import { ResultTable } from '@/components/admincomp/ResultComp/ResultTable'
import { Alert } from '@/components/ui/Alert'
import Pagination from '@/components/ui/Pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loader from '@/components/ui/loader'
import { useDeleteResults, useGetAllResutl } from '@/hooks/tanstackHooks/useResult'
import { toast } from 'sonner'
import { PasswordDelete } from '@/components/ui/passwordDelete'
import { useNavigate } from 'react-router-dom'

function ResultPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSelectedModalOpen, setSelectedModelOpen] = useState(false)
  const navigate = useNavigate()
  
  const { data, error, isLoading } = useGetAllResutl(debouncedSearch, currentPage, 20);
  const {mutate, isPending}=useDeleteResults()

  useEffect(() =>{
    if(data?.data){
      setTotalPage(data?.totalPages)
    }
  }, [data])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); 
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleDelete = (password)=>{
    const delteData = {password, allDelete: true, resultIds: [] }
    mutate(delteData, {
      onSuccess: (data) => {
        if(data.success){
          toast.success(data.message)
          setIsModalOpen(false)
        }else{
          toast.error(data.message)
        }
      }
    })
  }

  const handleSelectedDelete = (password)=>{
    if(selectedRow.length === 0){
      toast.error('Please select at least one row')
      return
    }
    const delteData = {password, allDelete: false, resultIds: selectedRow }
    mutate(delteData, {
      onSuccess: (data) => {
        if(data.success){
          toast.success(data.message)
          setSelectedRow([])
          setSelectedModelOpen(false)
        }else{
          toast.error(data.message)
        }
      }
    })
  }

  if(error){
    return (
      <div>Error to load data</div>
    )
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-4 pb-4 border-b'>
        <h1 className='text-xl font-semibold'>Result Of Examination</h1>
        <Button onClick={()=>navigate('upload')}>Add Result</Button>
      </div>
      <div>
      <div className="space-y-6 w-full h-full">
        <div className="flex max-sm:flex-col gap-2 justify-between items-center">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            type="text"
            placeholder="Search result..."
            className="max-w-sm max-sm:max-w-full"
          />
          <div className='space-x-2'>
          <Button variant='outline' disabled={!selectedRow.length} onClick={()=>setSelectedModelOpen(true)}>Delete Selected</Button>
          <Button variant='destructive' onClick={()=>setIsModalOpen(true)}>Delete All</Button>
        </div>
        </div>

        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : data?.data?.length > 0 ?
          <div className="rounded-xl overflow-hidden border">
            <ResultTable
              model={'open'}
              button='Change Status'
              data={data?.data}
              selectedIds={selectedRow}
              setSelectedIds={setSelectedRow}
            />
            <PasswordDelete loading={isPending} deleteFn={handleDelete} isOpen={isModalOpen}  setIsOpen={setIsModalOpen} />
            <PasswordDelete loading={isPending} deleteFn={handleSelectedDelete} isOpen={isSelectedModalOpen}  setIsOpen={setSelectedModelOpen} />
            <Pagination totalData={data?.total} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
            
          </div>:
          <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
          No data found
        </div>
          }
      </div>
      </div>
    </div>
  )
}

export default ResultPage