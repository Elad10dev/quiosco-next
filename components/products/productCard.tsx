

import { Product } from "@prisma/client";
import { formatCurrency, getImagenPath } from "../../src/util/index";
import Image from "next/image";
import AddProductButton from "./AddProductButton";


type ProductCardProps = {
  product:Product
};
export default function ProductCard({product}:ProductCardProps) {
  const imagePath = getImagenPath(product.image);
  return (
    <div className="border bg-white">
      <Image src={imagePath} alt={product.name} width={400} height={600}  />
      <div className="p-5">
        <h3 className="text-2xl font-bold"> {product.name} </h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
        <AddProductButton 
        product={product}
        />

      </div>
    </div>
  )
}
