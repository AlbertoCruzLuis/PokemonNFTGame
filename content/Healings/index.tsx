import { HealingCard } from "components/ItemsCard"
import { useContractEvent } from "hooks/useContractEvent"
import { useItemMarket } from "hooks/useItemMarket"
import { BiLoaderAlt } from "react-icons/bi"
import Popup from "reactjs-popup"

export const Healings = () => {
  const { items, buyItem, isBuying } = useItemMarket()
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
      <Popup open={isBuying} overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="flex flex-col p-4 bg-white rounded-md">
          <div className="flex items-center justify-center gap-2">
            <BiLoaderAlt className="animate-spin" color="black" />
            <span>Buying an Item...</span>
          </div>
        </div>
      </Popup>
    </div>
  )
}
