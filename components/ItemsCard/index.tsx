import { FC, useState } from "react"
import { QuantityPicker } from "components/QuantityPicker"
import { IbuyItem } from "hooks/useItemMarket"
import { CustomImage } from "components/CustomImage"

type HealingCardProps = {
  id: number,
  name: string,
  description: string,
  imageURI: string,
  cost: number,
  buyItem: ({ itemId, amount, costItem }: IbuyItem) => Promise<void>
}

export const HealingCard: FC<HealingCardProps> = ({ id, name, description, imageURI, cost, buyItem }) => {
  const [quantity, setQuantity] = useState(1)
  const nameParsed = name.replace("-", " ").toUpperCase()

  return (
    <div className="flex justify-between gap-2 p-4 bg-gray-100 rounded-sm xs:flex-col sm:flex-col">
      <div className="flex xs:flex-col sm:flex-col md:flex-col">
        <CustomImage
          imageURI={imageURI}
          height={50}
          width={50}
        />
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-black">{nameParsed}</span>
          <p className="text-sm font-semibold text-gray-800 break-words">{description}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <QuantityPicker min={1} max={99} quantity={quantity} setQuantity={setQuantity} price={cost} />
        <button className="px-8 rounded-sm bg-stone-900" onClick={() => buyItem({ itemId: id, amount: quantity, costItem: cost * quantity })}>
          <span className="font-semibold text-white">Buy</span>
        </button>
      </div>
    </div>
  )
}
