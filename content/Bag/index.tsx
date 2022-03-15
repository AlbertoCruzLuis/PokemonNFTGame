import { BagCard } from "components/ItemsCard/BagCard"
import { useHealingListNFT } from "hooks/useHealingListNFT"
import { BiLoaderAlt } from "react-icons/bi"
import Popup from "reactjs-popup"

export const Bag = () => {
  const { healings, useItem, loadingStatus } = useHealingListNFT()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">Items</h2>
      {healings?.length === 0 &&
      <div className="p-2 border border-white border-solid">
        <span className="text-white">{"Don't have Items"}</span>
      </div>
      }
      { healings?.map(({ id, name, description, imageURI, cost, amount }) => (
        <BagCard
          key={id}
          id={id}
          name={name}
          description={description}
          imageURI={imageURI}
          amount={amount}
          cost={cost}
          useItem={useItem} />
      )) }
      <Popup open={loadingStatus} overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="flex flex-col p-4 bg-white rounded-md">
          <div className="flex items-center justify-center gap-2">
            <BiLoaderAlt className="animate-spin" color="black" />
            <span>Using Item...</span>
          </div>
        </div>
      </Popup>
    </div>
  )
}
