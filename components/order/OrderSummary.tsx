"use client";

import { useStore } from "@/src/store";
import ProductsDetail from "./ProductsDetail";
import { useMemo } from "react";
import { formatCurrency } from "@/src/util";
import { createOrder } from "@/actions/create-order-actions";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const total = useMemo(() => order.reduce((total, product) => total + (product.quantity * product.price), 0), [order]);

  const handleCreateorder = async(formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total ,
      order,
    };
    const result = OrderSchema.safeParse(data);
    console.log(result);

    if (!result.success) {
      result.error.issues
                          .forEach(
                            issue => toast.error(issue.message));
      return
    }    
    
    
    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((error) => 
        toast.error(error.message));
      
    }
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">Listo para ordenar..!?</p>
      ) : (
        <div className="mt-5">
          {order.map((product, index) => (
            <ProductsDetail 
              key={`${product.id}-${index}`} 
              product={product} 
            />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {''}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
          <form 
          className="w-full mt-10 space-y-5"
          action={handleCreateorder}
          >
            <input 
            type="text" 
            placeholder="Nombre" 
            className="bg-white border border-gray-200 p-2 w-full" 
            name="name"
            />
            <input 
            type="submit" 
            value="Confirmar Pedido"
            className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            />
          </form>
        </div>
      )}
    </aside>
  );
}
