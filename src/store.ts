import { create } from 'zustand';
import { OrderItem } from './types';
import { Product } from '@prisma/client';

interface Store {
    order: OrderItem[];
    addToCart: (product: Product) => void;
    increaseQuantity: (id: Product['id']) => void;
    decreaseQuantity: (id: Product['id']) => void;
    removeProduct: (id: Product['id']) => void;
    clearOrder: () => void;
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {
        const { categoryId, image, ...data } = product;
        let order: OrderItem[] = [];

        if (get().order.find((item) => item.id === product.id)) {
            order = get().order.map((item) => {
                if (item.id === product.id && item.quantity < 5) {
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
    increaseQuantity: (id) => {
        set(state => ({
            order: state.order.map((product) => {
                if (product.id === id && product.quantity < 5) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                        subtotal: (product.quantity + 1) * product.price,
                    };
                }
                return product; // Necesario para retornar el item modificado y los no modificados
            })
        }));
    },
    
    decreaseQuantity: (id) => { 
        set(state => ({
            order: state.order.map((product) => {
                if (product.id === id && product.quantity > 1) {
                    return {
                        ...product,
                        quantity: product.quantity - 1,
                        subtotal: (product.quantity - 1) * product.price,
                    };
                }
                return product; // Necesario para retornar el item modificado y los no modificados
            })
        }));
    },
    removeProduct: (id) => {
        set((state) => ({
            order: state.order.filter((product) => product.id !== id),
        }))
    },
    clearOrder() {
        set(() => ({
            order: [],
        }))
    },
}));
