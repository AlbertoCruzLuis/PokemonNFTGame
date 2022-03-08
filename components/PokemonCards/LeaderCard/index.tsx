import { FC } from "react"

type LeaderCardProps = {
  position: number,
  imageURI: string,
  address: string,
  name: string,
  level: number,
  xp: number
}

export const LeaderCard: FC<LeaderCardProps> = ({ position, imageURI, address, name, level, xp }) => {
  return (
    <div className="flex gap-2">
      <span>{position}</span>
      <div className="flex">
        <span>{imageURI}</span>
        <div className="flex flex-col gap-2">
          <span>{address}</span>
          <span>{name}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span>{level}</span>
        <span>{xp}</span>
      </div>
    </div>
  )
}
