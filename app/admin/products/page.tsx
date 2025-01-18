import ProducPaginations from '@/components/products/ProducPaginations'
import ProductTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { redirect } from 'next/navigation'

async function ProductCount() {
  return await prisma.product.count()
  
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })

  return products
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}: {searchParams: {page: string}}) {
  const page = +searchParams.page || 1
  const pageSize = 10
  
  if(page < 0 ) redirect(`/admin/products`)
  const totalProductsData = await ProductCount()
  const productsData = await getProducts(page, pageSize)  
  const [totalProducts, products] = await Promise.all([totalProductsData, productsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if (page > totalPages) {return redirect(`/admin/products`)}

  return (
    <div>
      <Heading> Administrar Productos </Heading>
      
      <ProductTable 
      products={products}  
      />
      
      <ProducPaginations 
      page={page} 
      totalPages={totalPages}
      />
    </div>
  )
}
