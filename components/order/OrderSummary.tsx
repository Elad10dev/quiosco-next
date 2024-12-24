"use client";

import { useStore } from "@/src/store";
import ProductsDetail from "./ProductsDetail";
import { useMemo } from "react";
import { formatCurrency } from "@/src/util";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const total = useMemo(() => order.reduce((total, product) => total + (product.quantity * product.price), 0), [order]);

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
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {''}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
        </div>
      )}
    </aside>
  );
}
