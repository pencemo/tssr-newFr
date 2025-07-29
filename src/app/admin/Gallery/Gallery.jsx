import { CreatePost } from '@/components/admincomp/GalleryComp/CreatePost'
import ImageCard from '@/components/admincomp/GalleryComp/ImageCard'
import { Alert } from '@/components/ui/Alert'
import Loader from '@/components/ui/loader'
import { useAllGalleryPost, useCreatePost, useDeletePost, useUpdatePost } from '@/hooks/tanstackHooks/useGallery'
import React, { useState } from 'react'
import { toast } from 'sonner'

function Gallery() {

    const {data:galleryPost, isLoading, isError, error} = useAllGalleryPost()
    const [isOpen, setOpen]=useState(false)
    const [isDelete, setDelete]=useState(false)
    const [deleteId, setDeleteId]=useState(null)
    const [isEdit, setEdit]=useState(false)
    const {mutate:createPost}=useCreatePost()
    const {mutate:updatePost}=useUpdatePost()
    const {mutate:deletePost}=useDeletePost()
    const [formData, setFormData] = useState({
        image: "https://firebasestorage.googleapis.com/v0/b/tssr-79f4a.appspot.com/o/gallery%2F1748765638014?alt=media&token=8a1817e5-d012-447f-909b-52b97ffdac1a",
        title: "",
        description: "",
    })

    const handleEdit=(data)=>{
        setEdit(true)
        setOpen(true)
        setFormData(data)
    } 

    const handleDeleteOpen=(id)=>{
        setDelete(true)
        setDeleteId(id)
    }

    const handleDelete=()=>{
        const data = {id: deleteId}
        deletePost(data, {
            onSuccess:(data)=>{
                if(data.success){
                    toast.success(data.message)
                }else{
                   toast.error(data.message) 
                }
            }
        })
    }

    if(isError || error) return <div>Error to fetch data</div>
    if(isLoading) return <div className='w-full h-full'><Loader/></div>
  return (
    <div>
      <div className='flex justify-between items-center mb-4 max-md:flex-col gap-2'>
        <h1 className='text-2xl font-bold'>Gallery Images</h1>
        <CreatePost isEdit={isEdit} isOpen={isOpen} setOpen={setOpen} mutate={isEdit?updatePost:createPost} data={formData} setData={setFormData} />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 '>
        {galleryPost?.posts?.map((post, i) =>{
            return <ImageCard onDelete={handleDeleteOpen} onEdit={handleEdit} data={post} key={i} />
        })}
        <Alert deleteFn={handleDelete} isOpen={isDelete} setIsOpen={setDelete}  />
      </div>

    </div>
  )
}

export default Gallery
