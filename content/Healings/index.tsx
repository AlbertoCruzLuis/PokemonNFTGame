import { HealingCard } from "components/ItemsCard"
import { useContractEvent } from "hooks/useContractEvent"
import { useItemMarket } from "hooks/useItemMarket"
import { BiLoaderAlt } from "react-icons/bi"
import Popup from "reactjs-popup"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { motion } from "framer-motion"

export const Healings = () => {
  const { items, buyItem, isBuying } = useItemMarket()

  const variants = {
    visible: (i:any) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-white">Healings</h2>
      { items?.map(({ id, name, description, imageURI, cost }, index) => (
        <motion.div
          key={id}
          custom={index}
          initial={{ opacity: 0 }}
          animate="visible"
          variants={variants}
        >
          <HealingCard
            id={id}
            name={name}
            description={description}
            imageURI={imageURI}
            cost={cost}
            buyItem={buyItem} />
        </motion.div>
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
