"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function completeOrder(formData: FormData) {
    const orderId = formData.get("order_id");
    
    console.log("Order ID:", orderId);

    if (!orderId) {
        throw new Error("Order ID is required");
    }

    // Aquí podrías agregar la lógica para marcar la orden como completada en la base de datos
    await prisma.order.update({
        where: { id: Number(orderId) },
        data: { status: true,
                orderReadyAt: new Date(Date.now()),
         },
    });
    revalidatePath("/admin/orders");

    return {
        status: 'success',
        message: 'Order completed successfully'
    };
}
