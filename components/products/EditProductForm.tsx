"use client"


import { updateProduct } from "@/actions/update-product-actions"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useParams } from "next/navigation"


export default function EditProductForm({children}: {children: React.ReactNode}) {

  const router = useRouter()
  const params = useParams()
  const id = +params.id!

    const handleSubmit = async(FormData: FormData) => {
        const data = {
            name: FormData.get("name"),
            categoryId: FormData.get("categoryId"),
            price: FormData.get("price"),
            image: FormData.get("image"),
        }
        const result = ProductSchema.safeParse(data)
        console.log(result)
        if (!result.success) {
            result.error.issues.forEach((issue) => toast.error(issue.message));
            return;
        }
        const response = await updateProduct(result.data, id )
        if(response?.errors) {
          response.errors.forEach(issue => {
            toast.error(issue.message)
          })
          return
    }
        toast.success("Producto actualizado con exito")
        router.push('/admin/products')
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
                value='Guardar Cambios'
             />

      </form>
    </div>
  )
}
