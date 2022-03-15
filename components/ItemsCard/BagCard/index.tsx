import { FC, useState } from "react"
import { imageLoader } from "lib/imageLoader"
import Image from "next/image"
import { QuantityPicker } from "components/QuantityPicker"
import { IbuyItem } from "hooks/useItemMarket"

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
    <div className="flex justify-between gap-4 p-4 rounded-sm xs:flex-col sm:flex-col md:flex-col bg-sky-900">
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
          <span className="font-semibold text-white">{nameParsed}</span>
          <p className="text-sm font-semibold text-gray-400 break-words">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-200">x {amount}</span>
        <button className="px-8 rounded-sm bg-sky-100" onClick={() => useItem(id, 0)}>
          <span className="font-semibold">Use</span>
        </button>
      </div>
    </div>
  )
}
