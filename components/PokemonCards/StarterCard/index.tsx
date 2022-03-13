import { Stat } from "hooks/usePokemon"
import Image from "next/image"
import { FC } from "react"
import { v4 as uuidv4 } from "uuid"
import { imageLoader } from "lib/imageLoader"

type StarterCardProps = {
  id: number | undefined
  name: string | undefined,
  types: string[] | undefined,
  stats: Stat[] | undefined
  sprites: any
}

export const StarterCard: FC<StarterCardProps> = ({ id, name, types, stats, sprites }) => {
  const frontSprite = sprites && sprites.other.home.front_default.replace("https://raw.githubusercontent.com/PokeAPI", "")

  return (
    <div className="">
      <div className="py-14"></div>
      <div className="relative flex flex-col items-center justify-center gap-4 p-2 border-4 border-solid border-sky-800 hover:border-red-700 hover:bg-red-900 rounded-xl max-w-max bg-sky-800">
        <div className="py-6"></div>
        <div className='absolute flex justify-center -top-24'>
          { sprites &&
            <Image
              loader={imageLoader}
              src={frontSprite}
              width={150}
              height={150}
              quality={100} />
          }
        </div>
        <span className="text-lg font-bold text-white">{name}</span>
        <div className="flex justify-center gap-2">
          {types && types.map((type) => (
            <div key={uuidv4()} className="px-2 border-2 border-gray-400 border-solid rounded-3xl max-w-max" >
              <span className="text-white">{type}</span>
            </div>
          ))}
        </div>
        <div className="grid justify-center grid-cols-3 gap-2">
          {stats && stats.map((stat) => (
            <div key={uuidv4()} className="flex flex-col items-center justify-center gap-2">
              <span className="text-gray-400">{stat.name}</span>
              <span className="text-lg font-semibold text-white">{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="py-2"></div>
        <div className="absolute flex justify-center p-1 px-10 -bottom-4 rounded-3xl bg-sky-200 max-w-max">
          <span className="font-semibold text-black">#{id}</span>
        </div>
      </div>
    </div>
  )
}
