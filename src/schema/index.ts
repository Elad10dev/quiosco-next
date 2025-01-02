import { z } from "zod";

export const OrderSchema = z.object({
    name: z.string().min(1, 'El Campo para nombre es OBLIGATORIO'),
    total: z.number().min(1, 'Error!, ORDEN SIN ARTICULOS'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})