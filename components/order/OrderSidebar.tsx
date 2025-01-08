import { prisma } from "@/src/lib/prisma"
import CatergoryIcon from "../ui/CatrgoryIcon"
import Logo from "../ui/Logo"



async function getCatergories() {
  return await prisma.category.findMany()
  
}

export default async function OrderSidebar() {
  const categories = await getCatergories()
  console.log(categories)
  return (
    <aside className="md:w-72 h-screen bg-white flex flex-col">
      <Logo />
      <nav className="mt-10 flex-grow">
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
