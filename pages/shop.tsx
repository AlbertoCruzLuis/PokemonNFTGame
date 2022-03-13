import { Healings } from "content/Healings"
import type { NextPage } from "next"

const Shop: NextPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">Shop</h2>
      <Healings />
    </div>
  )
}

export default Shop
