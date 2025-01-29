"use client"
import { SearchSchema } from "@/src/schema/index";
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {
    const router = useRouter()

    const handleSubmit = (formData: FormData) => {
        const data = { 
            search : formData.get('search')
        }

        const result = SearchSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => toast.error(issue.message));
            return;
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }

    return (
    <form 
    action={handleSubmit}
    className='flex items-center'
    ><input 
        type="text" 
        placeholder='Buscar producto'
        className='p-2 placeholder:text-gray-400 w-full'
        name='search'
    />
    <input 
    className='bg-indigo-600 p-2 uppercase text-white cursor-pointer'
    value={'Buscar'} 
    type="submit" />

    </form>
  )
}
