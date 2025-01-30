import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='text-center'>
        <Heading>Product not found</Heading>
        <Link
            href={'/admin/products'}
            className='bg-amber-500 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto'
        >Ir a Producto
        </Link>
      
    </div>
  )
}
