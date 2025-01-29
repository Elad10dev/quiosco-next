import React from 'react'

export default function ProductSearchForm() {
  return (
    <form 
    action=""
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
