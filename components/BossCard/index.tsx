import { CustomImage } from "components/CustomImage"
import { CustomLink } from "components/CustomLink"
import { Rewards } from "content/Rewards"
import { FC } from "react"
import { motion } from "framer-motion"

interface IBossCardProps {
  id: number,
  index: number,
  name: string,
  imageURI: string,
  level: number,
  hp: number,
  rewards: []
}

const variants = {
  visible: (i:any) => ({
    opacity: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.3
    }
  })
}

export const BossCard: FC<IBossCardProps> = ({ id, index, name, imageURI, level, hp, rewards }) => {
  const isAlive = hp > 0
  return (
    <motion.div
      className={`relative flex justify-between p-4 rounded-sm ${isAlive ? "bg-blue-800/50" : "bg-red-800/50"}`}
      custom={index}
      initial={{ opacity: 0 }}
      animate="visible"
      variants={variants}
    >
      <div className="flex gap-2">
        <div>
          <div className="flex p-2 rounded-sm bg-neutral-800">
            <span className="text-lg font-semibold text-white">Level {level} / {name}</span>
          </div>
          <div className="flex flex-row gap-2 xs:flex-col">
            <CustomImage
              imageURI={imageURI}
              width={100}
              height={100}
            />
            { rewards.length > 0 &&
              <div className="flex flex-col">
                <span className="font-semibold text-gray-200">Rewards</span>
                <Rewards rewards={rewards} />
              </div>
            }
          </div>
        </div>
      </div>
      <div className="flex items-center">
        { isAlive &&
        <CustomLink href={`/arena/${id}`}>
          <div className="flex items-center gap-2 p-2 px-8 border-2 border-yellow-400 border-solid bg-gradient-to-t from-black to-yellow-500 max-w-max">
            <span className="font-semibold text-white">Play</span>
          </div>
        </CustomLink>
        }
      </div>
      { !isAlive &&
        <div className="absolute text-gray-400/5 bottom-10 text-8xl right-5">
          Death
        </div>
      }
    </motion.div>
  )
}
