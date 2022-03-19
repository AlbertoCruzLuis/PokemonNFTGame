import { HealingCard } from "components/ItemsCard"
import { useContractEvent } from "hooks/useContractEvent"
import { useItemMarket } from "hooks/useItemMarket"
import { BiLoaderAlt } from "react-icons/bi"
import Popup from "reactjs-popup"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

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
      { !items &&
        <div className="flex justify-between gap-2 p-4 bg-gray-100 rounded-sm xs:flex-col sm:flex-col">
          <div className="flex gap-2 xs:flex-col">
            <Skeleton highlightColor="#C2CBD7" width={50} height={50}/>
            <div className="flex flex-col gap-2">
              <Skeleton highlightColor="#C2CBD7" width={100} />
              <Skeleton highlightColor="#C2CBD7" />
            </div>
          </div>
          <div className="flex items-center">
            <Skeleton highlightColor="#C2CBD7" width={60} height={30} />
          </div>
        </div>
      }
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
