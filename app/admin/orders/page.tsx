import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { OrderWithProducts } from "@/src/types";
import { revalidatePath } from "next/cache";

type OrderCardProps = { order: OrderWithProducts };


async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });
  return orders;
}

export default async function OrdersPage() {
  const orders = await getPendingOrders();
  const refreshOrders = async() => {
    "use server";
    revalidatePath("/admin/orders");
  }
  
  return (
    <>
      <Heading> Administar Ordenes </Heading>
      <form
        action={refreshOrders}
      >
        <input
          type="submit"
          value="Actualizar Ordenes"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        />
      </form>
      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map(order => (
          <OrderCard
          key={order.id}
          order={{
          ...order,
          orderProducts: order.orderItems.map(item => ({
          ...item,
          product: item.product
      }))
    }}
  />
))}
        </div>
      ) : (
        <p>No hay ordenes pendientes</p>
      )}
    </>
  )
}

/*ACTUALIZAR POR API AUTOMATICO
"use client";
import  useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";


export default  function OrdersPage() {
  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data);
  const {data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 1500
    
  })

  if (isLoading) return 'Cargando...';
    
  if (data) return (
    <>
      <Heading> Administar Ordenes </Heading>
      
      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map(order => (
          <OrderCard
          key={order.id}
          order={{
            ...order,
            orderProducts: order.orderProducts.map(item => ({
              ...item,
              product: item.product
            }))
          }}
  />
))}
        </div>
      ) : (
        <p>No hay ordenes pendientes</p>
      )}
    </>
  )
}*/

