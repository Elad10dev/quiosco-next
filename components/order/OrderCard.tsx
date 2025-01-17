"use client";

import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/util";
import { completeOrder } from "@/actions/complete-order-actions";
import { useState } from "react";

type OrderCardProps = { order: OrderWithProducts };

export default function OrderCard({ order }: OrderCardProps) {
    const [isCompleted, setIsCompleted] = useState(order.status === true);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const response = await completeOrder(formData);

        if (response.status === 'success') {
            setIsCompleted(true);
        }
    };

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900'>Cliente: {order.name}</p>
            <dl className="mt-6 space-y-4">
                {order.orderProducts.map(product => (
                    <div 
                        key={product.id}
                        className="flex items-center justify-between border-t border-gray-200 pt-4"
                    >
                        <dt className="flex items-center text-sm text-gray-600">
                            <span className="font-black">({product.quantity}) {'ud.//->'}</span> {product.product.name}
                        </dt>
                    </div>
                ))}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                </div>
            </dl>

            {!isCompleted && (
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="order_id" value={order.id} />
                    <input
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                        value='Marcar Orden Completada'
                    />
                </form>
            )}
            {isCompleted && (
                <p className="text-green-600 font-bold">Orden completada</p>
            )}
        </section>
    );
}
