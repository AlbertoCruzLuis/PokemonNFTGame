import { FC, useEffect, useState } from "react"
import Image from "next/image"
import type { ImageLoaderProps } from "next/image"
import { Line } from "rc-progress"

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://raw.githubusercontent.com/PokeAPI/${src}?w=${width}&q=${quality || 75}`
}

type BattleCardProps = {
  name: string,
  hp: number,
  maxHp: number,
  imageURI: string,
  level: number,
  experience: number
}

enum PROGRESS_COLOR {
  red = "red",
  green = "green",
  orange = "orange"
}

export const BattleCard: FC<BattleCardProps> = ({ name, hp, maxHp, imageURI, level, experience }) => {
  const frontSprite = imageURI && imageURI.replace("https://raw.githubusercontent.com/PokeAPI", "")
  const [healthColor, setHealthColor] = useState<string>()

  useEffect(() => {
    const healthPercentage = (hp / maxHp) * 100
    if (healthPercentage < 20) {
      setHealthColor(PROGRESS_COLOR.red)
    }
    if (healthPercentage >= 20 && healthPercentage <= 50) {
      setHealthColor(PROGRESS_COLOR.orange)
    }
    if (healthPercentage > 50) {
      setHealthColor(PROGRESS_COLOR.green)
    }
  }, [hp])

  return (
    <div className="flex gap-2 pl-2 pr-4 bg-white rounded-sm max-w-max">
      <div>
        { imageURI &&
            <Image
              loader={imageLoader}
              src={frontSprite}
              width={50}
              height={50}
              quality={100} />
        }
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="font-semibold">{name}</span>
          <span className="font-semibold">Lv {level}</span>
        </div>
        <Line
          className="w-48 h-2.5"
          strokeColor={healthColor}
          percent={(hp / maxHp) * 100} />
        <div className="flex justify-between">
          <div className="flex gap-1">
            <span>{hp}</span>
            <span>/</span>
            <span>{maxHp} HP</span>
          </div>
          <Line className="w-12 h-1 mt-1" percent={experience} />
        </div>
      </div>
    </div>
  )
}
