import { FC } from "react"
import { imageLoader } from "lib/imageLoader"
import Image from "next/image"
import { QuantityPicker } from "components/QuantityPicker"

type HealingCardProps = {
  name: string,
  description: string,
  imageURI: string,
  cost: number
}

export const HealingCard: FC<HealingCardProps> = ({ name, description, imageURI, cost }) => {
  const sprite = imageURI && imageURI.replace("https://raw.githubusercontent.com/PokeAPI", "")
  const nameParsed = name.replace("-", " ").toUpperCase()
  return (
    <div className="flex justify-between gap-2 p-4 rounded-sm xs:flex-col sm:flex-col md:flex-col bg-sky-900">
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
      <div className="flex gap-4">
        <QuantityPicker price={cost} />
        <button className="px-8 rounded-sm bg-sky-100">
          <span className="font-semibold">Buy</span>
        </button>
      </div>
    </div>
  )
}
