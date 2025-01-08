import React from 'react'
import Image from 'next/image'

export default function Logo() {
  return (
    <div className='flex justify-center mt-5'>
        <div className='relative w-20 h-20'>
            <Image
                fill
                src='/logo.svg'
                alt='logo'
                
            />
        </div>
      
    </div>
  )
}
