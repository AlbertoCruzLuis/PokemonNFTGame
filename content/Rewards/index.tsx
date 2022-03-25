import { CustomImage } from "components/CustomImage"
import { v4 as uuidv4 } from "uuid"

interface IRewardsProps {
  rewards: []
}

export const Rewards = ({ rewards }: IRewardsProps) => {
  return (
    <div className="flex border-2 border-gray-200 border-solid rounded-md">
      { rewards.map((reward: any) => {
        return (
          <div key={uuidv4()} className="flex flex-col items-center">
            <CustomImage
              imageURI={reward.potionImage}
              height={50}
              width={50} />
            <span className="font-semibold text-gray-200">{reward.amount}</span>
          </div>
        )
      })}
    </div>
  )
}
