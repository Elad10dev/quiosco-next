"use client";

import { useStore } from "@/src/store";
import ProductsDetail from "./ProductsDetail";

export default function OrderSummary() {
  const order = useStore((state) => state.order);

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">Carrito está vacío..!!</p>
      ) : (
        <div className="mt-5">
          {order.map((product, index) => (
            <ProductsDetail 
              key={`${product.id}-${index}`} 
              product={product} 
            />
          ))}
        </div>
      )}
    </aside>
  );
}  // <- Aquí parece que el problema está con la llave de cierre
