import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import Logo from "@/components/ui/Logo";
import { prisma } from "@/src/lib/prisma";
import { OrderWithProducts } from "@/src/types";
import { revalidatePath } from "next/cache";

type OrderCardProps = { order: OrderWithProducts };

async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: true
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
      <h1 className="text-center mt-20 text-6xl font-black">Ordenes Listas</h1>
      <Logo/>
      {orders.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
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
        <p className="text-center mt-10">No hay ordenes pendientes</p>
      )}
      <div className="flex justify-center mt-10">
        <form action={refreshOrders}>
          <input
            type="submit"
            value="Actualizar Ordenes"
            className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
          />
        </form>
      </div>
    </>
  )
}
