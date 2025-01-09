import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { OrderWithProducts } from "@/src/types";

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
  
  return (
    <>
      <Heading> Administar Ordenes </Heading>
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
