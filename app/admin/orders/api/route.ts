import { prisma } from "@/src/lib/prisma";

export async function GET() {

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
    return Response.json(orders)
}