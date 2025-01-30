"use client"

import { ProductSchema } from "@/src/schema"
import { toast } from "react-toastify"


export default function AddProductForm({children}: {children: React.ReactNode}) {

    const handleSubmit = async(FormData: FormData) => {
        const data = {
            name: FormData.get("name"),
            description: FormData.get("description"),
            price: FormData.get("price"),
            image: FormData.get("image"),
        }
        const result = ProductSchema.safeParse(data)
        console.log(result)
        if (!result.success) {
            result.error.issues.forEach((issue) => toast.error(issue.message));
            return;
        }
    }

    return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto'>
      <form
        className="space-y-5"
        action={handleSubmit}
      >
            {children}

            <input 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                value='Registrar producto'
             />

      </form>
    </div>
  )
}
