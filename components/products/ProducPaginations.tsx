import Link from 'next/link'
import React from 'react'

type ProductsPaginationProps = {
  page : number
  totalPages: number
}

export default function ProducPaginations({page, totalPages}: ProductsPaginationProps) {
  return (
    <nav className="flex justify-center py-10">
      {page > 1 && <
        Link href={`/admin/products?page=${page - 1}`} 
        className="px-3 py-2 bg-amber-400 text-black-500 text-sm ring-1 ring inset ring-black-500 focus:z-20 focus:outline-offset-0"
        >Anterior
        </Link>}
      {page < totalPages && <
        Link href={`/admin/products?page=${page + 1}`} 
        className="px-3 py-2 bg-amber-400 text-black-500 text-sm ring-1 ring inset ring-black-500 focus:z-20 focus:outline-offset-0"
        >Siguiente
        </Link>}
      
    </nav>
  )
}
