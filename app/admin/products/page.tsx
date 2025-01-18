import ProductTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'

async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  })

  return products
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage() {
  const products = await getProducts()
  console.log(products)

  return (
    <div>
      <Heading> Administrar Productos </Heading>
      <ProductTable products={products}  />
    </div>
  )
}
