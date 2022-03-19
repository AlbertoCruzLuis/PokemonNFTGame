import { FC } from "react"
import { imageLoader } from "lib/imageLoader"
import Image from "next/image"

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
  const sprite = imageURI && imageURI.replace("https://raw.githubusercontent.com/PokeAPI", "")
  const nameParsed = name.replace("-", " ").toUpperCase()
  return (
    <div className="flex justify-between gap-4 p-4 bg-gray-100 rounded-sm xs:flex-col sm:flex-col md:flex-col">
      <div className="flex xs:flex-col sm:flex-col md:flex-col">
        <div className="">
          <Image
            loader={imageLoader}
            src={sprite}
            width={50}
            height={50}
            quality={100} />
        </div>
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
