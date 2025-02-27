'use client';

import { Product } from "@prisma/client";
import { useStore } from "@/src/store";

type AddProductButtonProps = {
    product: Product
};
    
export default function AddProductButton({product}:AddProductButtonProps) {
    const addToCart = useStore((state) => state.addToCart);
    return (
    <button
    type="button"
    onClick={() => addToCart(product)}
    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
    >Agregar
    </button>
    )
}
    
    
    
    
    
    
    
   