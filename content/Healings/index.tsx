import { HealingCard } from "components/HealingCard"
import { useAllHealing } from "hooks/useHealing"
import { v4 as uuidv4 } from "uuid"

export const Healings = () => {
  const { healings, isLoading } = useAllHealing()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">Healings</h2>
      { healings?.map(({ id, name, description, sprite, cost }) => (
        <HealingCard
          key={id}
          name={name}
          description={description}
          imageURI={sprite}
          cost={cost} />
      )) }
    </div>
  )
}
