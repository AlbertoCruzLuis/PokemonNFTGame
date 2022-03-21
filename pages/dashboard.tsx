import { CustomLink } from "components/CustomLink"
import { LeaderBoard } from "components/LeaderBoard"
import { Bag } from "content/Bag"
import { PokemonMain } from "content/PokemonMain"
import { Pokemons } from "content/Pokemons"
import { SelectPokemon } from "content/SelectPokemon"
import { useHasPokemon } from "hooks/useHasPokemon"
import type { NextPage } from "next"

const Dashboard: NextPage = () => {
  const { pokemonSelected, setPokemonSelected } = useHasPokemon()

  return (
    <>
      {!pokemonSelected && <SelectPokemon setPokemonSelected={setPokemonSelected} />}
      {pokemonSelected && (
        <div className="grid grid-cols-3 xs:grid-cols-1 grow">
          <div>
          </div>
          <div className="grid grid-rows-6">
            <div></div>
            <div className="flex row-span-4 place-content-center">
              <PokemonMain />
            </div>
            <div className="flex justify-center">
              <CustomLink href="/arena">
                <div className="flex items-center gap-2 p-2 px-8 border-2 border-yellow-400 border-solid bg-gradient-to-t from-black to-yellow-500 max-w-max">
                  <span className="font-semibold text-white">Go to Arena</span>
                </div>
              </CustomLink>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between xs:items-center">
            <Bag />
          </div>
        </div>
      ) }
    </>
  )
}

export default Dashboard
