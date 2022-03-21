import { useHasPokemon } from "hooks/useHasPokemon"
import Image from "next/image"
import { imageLoader } from "lib/imageLoader"
import { motion } from "framer-motion"

export const PokemonMain = () => {
  const { pokemonSelected } = useHasPokemon()
  const pokemonImage: any = pokemonSelected && pokemonSelected.imageURI.replace("https://raw.githubusercontent.com/PokeAPI", "")
  const pokemonName = pokemonSelected && pokemonSelected.name.toUpperCase()

  const variants = {
    visible: (i:any) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        custom={1}
        initial={{ opacity: 0 }}
        animate="visible"
        variants={variants}
        className="flex gap-4 p-2 px-6 mb-10 rounded-sm bg-gradient-to-b from-white to-neutral-400">
        <span className="font-semibold">Lv {pokemonSelected?.level}</span>
      </motion.div>
      <motion.div
        custom={1}
        initial={{ opacity: 0 }}
        animate="visible"
        variants={variants}
        className="relative flex justify-center">
        <Image
          src="/assets/Platform.svg"
          width={220}
          height={220}
          quality={100} />
        <div className="absolute right-0 bottom-16">
          { pokemonSelected &&
              <Image
                loader={imageLoader}
                src={pokemonImage}
                width={200}
                height={200}
                quality={100} />
          }
        </div>
      </motion.div>
      <motion.div
        custom={1}
        initial={{ opacity: 0 }}
        animate="visible"
        variants={variants}
        className="flex justify-center">
        <span className="text-lg font-semibold text-gray-200">{pokemonName}</span>
      </motion.div>
    </div>
  )
}
