import { prisma } from "@/src/lib/prisma"
import CatergoryIcon from "../ui/CatrgoryIcon"



async function getCatergories() {
  return await prisma.category.findMany()
  
}

export default async function OrderSidebar() {
  const categories = await getCatergories()
  console.log(categories)
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <nav className="mt-10">
        {categories.map(category => (
          <CatergoryIcon
          key={category.id}
          category={category}
          />
        ))}
      </nav>

    </aside>
  )
}
