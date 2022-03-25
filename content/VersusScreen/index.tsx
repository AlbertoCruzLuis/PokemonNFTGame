import { FC } from "react"
import { motion } from "framer-motion"
import { CustomImage } from "components/CustomImage"

interface IVersusScreenProps {
  imageUriP1: string,
  imageUriP2: string,
  walletP1: string,
  walletP2: string
}

export const VersusScreen: FC<IVersusScreenProps> = ({ imageUriP1, imageUriP2, walletP1, walletP2 }) => {
  const variants = {
    visible: (i:any) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 2
      }
    })
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-start">
        <div className="flex bg-blue-600 max-w-max">
          <span className="p-1 px-4 font-semibold text-white">{walletP1}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <motion.div
          className="flex justify-start"
          custom={1}
          initial={{ opacity: 0 }}
          animate="visible"
          variants={variants}>
          <CustomImage
            imageURI={imageUriP1}
            width={200}
            height={200} />
        </motion.div>
        <div className="relative flex items-center justify-center rotate-45">
          <hr className="absolute w-1/2 rotate-90 bg-gray-200">
          </hr>
          <div className="z-10 p-6 bg-red-900 xs:p-4">
            <div className="flex -rotate-45">
              <div >
                <span className="text-4xl font-bold text-gray-200 xs:text-2xl">V</span>
              </div>
              <div className="pt-1">
                <span className="text-4xl font-bold text-gray-200 xs:text-2xl">S</span>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="flex justify-end"
          custom={1}
          initial={{ opacity: 0 }}
          animate="visible"
          variants={variants}>
          <CustomImage
            imageURI={imageUriP2}
            width={200}
            height={200} />
        </motion.div>
      </div>
      <div className="flex justify-end">
        <div className="flex bg-blue-600 max-w-max">
          <span className="p-1 px-4 font-semibold text-white">{walletP2}</span>
        </div>
      </div>
    </div>
  )
}
