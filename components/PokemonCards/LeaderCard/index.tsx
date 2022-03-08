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
      <span>1</span>
      <div className="flex">
        <span>Foto</span>
        <div className="flex flex-col gap-2">
          <span>Address</span>
          <span>Name</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span>Level</span>
        <span>XP</span>
      </div>
    </div>
  )
}
