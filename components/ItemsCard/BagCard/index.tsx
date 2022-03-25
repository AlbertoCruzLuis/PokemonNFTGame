import { FC } from "react"
import { CustomImage } from "components/CustomImage"

type HealingCardProps = {
  id: number,
  name: string,
  description: string,
  imageURI: string,
  cost: number,
  amount: number,
  useItem: (itemId: number, pokemonIndex: number) => Promise<void>
}

export const BagCard: FC<HealingCardProps> = ({ id, name, description, imageURI, amount, useItem }) => {
  const nameParsed = name.replace("-", " ").toUpperCase()
  return (
    <div className="flex justify-between gap-4 p-4 bg-gray-100 rounded-sm xs:flex-col sm:flex-col md:flex-col">
      <div className="flex xs:flex-col sm:flex-col md:flex-col">
        <CustomImage
          imageURI={imageURI}
          height={50}
          width={50}
        />
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-black">{nameParsed}</span>
          <p className="text-sm font-semibold break-words text-stone-800">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-stone-800">x {amount}</span>
        <button className="px-8 rounded-sm bg-stone-900" onClick={() => useItem(id, 0)}>
          <span className="font-semibold text-white">Use</span>
        </button>
      </div>
    </div>
  )
}
