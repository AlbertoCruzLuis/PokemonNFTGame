import { HealingCard } from "components/ItemsCard"
import { useContractEvent } from "hooks/useContractEvent"
import { useItemMarket } from "hooks/useItemMarket"

export const Healings = () => {
  const { items, buyItem } = useItemMarket()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">Healings</h2>
      { items?.map(({ id, name, description, imageURI, cost }) => (
        <HealingCard
          key={id}
          id={id}
          name={name}
          description={description}
          imageURI={imageURI}
          cost={cost}
          buyItem={buyItem} />
      )) }
    </div>
  )
}
