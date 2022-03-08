import Image from "next/image"
import { FC } from "react"

type LogoProps = {
  size?: string
}

export const Logo: FC<LogoProps> = ({ size = "text-lg" }) => {
  return (
    <div className={`flex items-center ${size} gap-1`}>
      <Image src="/assets/LogoIcon.svg" width={30} height={24} />
      <span className="font-bold text-white">POKEMON</span>
      <span className="font-extrabold text-yellow-400">NFT</span>
    </div>
  )
}
