import { create } from 'zustand';
import { OrderItem } from './types';
import { Product } from '@prisma/client';

interface Store {
    order: OrderItem[];
    addToCart: (product: Product) => void;
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {
        const { categoryId, image, ...data } = product;
        let order: OrderItem[] = [];

        if (get().order.find((item) => item.id === product.id)) {
            order = get().order.map((item) => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: (item.quantity + 1) * product.price,
                    };
                }
                return item; // Necesario para retornar el item modificado y los no modificados
            });
        } else {
            order = [
                ...get().order,
                {
                    ...data,
                    quantity: 1,
                    subtotal: 1 * product.price,
                },
            ];
        }

        set((state) => ({
            order: order,
        }));
    },
}));
