import { FC, useState } from "react"

type QuantityPickerProps = {
  price: number
}

export const QuantityPicker: FC<QuantityPickerProps> = ({ price }) => {
  const [quantity, setQuantity] = useState(1)

  const increment = () => {
    if (quantity >= 99) return
    setQuantity(quantity + 1)
  }

  const decrement = () => {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <button className="flex items-center justify-center w-8 h-8 border border-gray-400 border-solid rounded-full hover:bg-gray-400" onClick={decrement}>
        <span className="font-bold">-</span>
      </button>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-lg font-semibold">{quantity}</span>
        <span className="text-sm text-gray-400">$ {price * quantity}</span>
      </div>
      <button className="flex items-center justify-center w-8 h-8 border border-gray-400 border-solid rounded-full hover:bg-gray-400" onClick={increment}>
        <span className="font-bold">+</span>
      </button>
    </div>
  )
}
