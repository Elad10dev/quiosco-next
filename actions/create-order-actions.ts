"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

export async function createOrder(data: unknown) {
  const result = OrderSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }
  try {
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderItems: {
          create: result.data.order.map((product: any) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
