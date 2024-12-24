import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/src/util"
import {XCircleIcon, PlusIcon, MinusIcon} from '@heroicons/react/24/outline'

type ProductsDetailProps = {
    product: OrderItem
}


export default function ProductsDetail({product}:ProductsDetailProps) {
  return (
    <div>
      <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{product.name} </p>

                    <button
                        type="button"
                        
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8" />
                    </button>
                </div>
                <p className="text-2xl text-amber-500 font-black">
                    {formatCurrency(product.price)}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        type="button"
                        
                        className='disabled:opacity-20'
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>

                    <p className="text-lg font-black ">
                        {product.quantity}
                    </p>

                    <button
                        type='button'
                        
                        className="disabled:opacity-10"
                        
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
                <p className="text-xl font-black text-gray-700">
                    Subtotal: {''}
                    <span className="font-normal">
                        {formatCurrency(product.subtotal)}
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}
