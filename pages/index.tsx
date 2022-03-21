import type { NextPage } from "next"
import Image from "next/image"
import type { ImageLoaderProps } from "next/image"
import { MdOutlineCatchingPokemon } from "react-icons/md"
import { useRouter } from "next/router"
import { useWeb3 } from "@3rdweb/hooks"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import Head from "next/head"

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://raw.githubusercontent.com/PokeAPI/${src}?w=${width}&q=${quality || 75}`
}

const Home: NextPage = () => {
  const { address } = useWeb3()
  const router = useRouter()

  const goToDashboard = () => {
    if (address) {
      router.push("/dashboard")
    } else {
      toast.error("Please Connect Wallet")
    }
  }

  return (
    <>
      <Head>
        <title>PokemonNFT</title>
      </Head>
      <section className='grid grid-cols-2 gap-8 my-auto'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='flex flex-col justify-center gap-10 xs:items-center xs:col-span-2'>
          <div className='flex flex-col gap-2 xs:items-center'>
            <div>
              <span className='font-semibold text-yellow-400'>Game</span>
            </div>
            <div className="flex flex-col gap-4 xs:items-center">
              <h2 className='text-6xl font-bold text-white xs:text-5xl'>Pokemon NFT</h2>
              <h2 className='text-5xl font-semibold text-yellow-400 xs:text-4xl'>Battle and Earn</h2>
            </div>
          </div>
          <div className="flex xs:justify-center">
            <p className='text-gray-300'>Collect all pokemon and defeat the boss.</p>
          </div>
          <button className="flex items-center gap-2 p-2 px-8 border-2 border-yellow-400 border-solid bg-gradient-to-t from-black to-yellow-500 max-w-max"
            onClick={goToDashboard} >
            <MdOutlineCatchingPokemon color="white" />
            <span className='font-semibold text-white'>
              Play
            </span>
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='flex flex-col items-center justify-center gap-4 xs:col-span-2'>
          <div className="bg-[url('/assets/Space.jpg')]">
            <div className="relative pt-4 xs:w-60 w-80 xs:h-[32rem] h-[36rem] bg-gradient-to-t from-gray-900 to-sky-800/70">
              <div className='absolute p-4 px-8 bg-sky-1000 -left-4'>
                <span className='text-xl font-bold text-white'>THE BOSS</span>
              </div>
              <div className='p-6'></div>
              <div
                className='absolute -left-12 w-96 xs:w-80'>
                <Image
                  loader={imageLoader}
                  src="sprites/master/sprites/pokemon/other/home/150.png"
                  width={400}
                  height={400}
                  quality={100} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default Home
