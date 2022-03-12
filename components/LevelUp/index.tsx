import { FC } from "react"
import { v4 as uuidv4 } from "uuid"

interface IAtributtes {
  level: number,
  hp: number,
  maxHp: number,
  attack: number
}

type LevelUpProps = {
  attributes: IAtributtes | undefined
}

export const LevelUp: FC<LevelUpProps> = ({ attributes }) => {
  const stats = [
    { name: "HP", value: attributes?.maxHp },
    { name: "Attack", value: attributes?.attack }
  ]
  return (
    <div className="flex flex-col p-4 rounded-md max-w-max">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
          <span className="text-5xl font-bold text-sky-200">{attributes?.level}</span>
        </div>
        <span className="text-3xl font-bold text-white">LEVEL UP!</span>
        <div className="flex gap-2">
          {stats.map((stat) => (
            <div key={uuidv4()} className="flex flex-col items-center justify-center gap-4">
              <span className="font-bold text-white text-md">{stat.name}</span>
              <div className="flex items-center justify-center gap-1">
                <span className="font-bold text-white text-md">{stat.value}</span>
                <span className="text-xs font-bold text-green-400">+1</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
