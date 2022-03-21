import { useHasPokemon } from "hooks/useHasPokemon"
import Image from "next/image"
import { imageLoader } from "lib/imageLoader"

export const PokemonMain = () => {
  const { pokemonSelected } = useHasPokemon()
  const pokemonImage: any = pokemonSelected && pokemonSelected.imageURI.replace("https://raw.githubusercontent.com/PokeAPI", "")
  const pokemonName = pokemonSelected && pokemonSelected.name.toUpperCase()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-4 p-2 px-6 mb-10 rounded-sm bg-gradient-to-b from-white to-neutral-400">
        <span className="font-semibold">Lv {pokemonSelected?.level}</span>
      </div>
      <div className="relative flex justify-center">
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
      </div>
      <div className="flex justify-center">
        <span className="text-lg font-semibold text-gray-200">{pokemonName}</span>
      </div>
    </div>
  )
}
