import { CustomLink } from "components/CustomLink"
import { LeaderBoard } from "components/LeaderBoard"
import { Pokemons } from "content/Pokemons"
import { SelectPokemon } from "content/SelectPokemon"
import { useHasPokemon } from "hooks/useHasPokemon"
import type { NextPage } from "next"

const Dashboard: NextPage = () => {
  const { pokemonSelected, setPokemonSelected } = useHasPokemon()

  return (
    <div>
      {!pokemonSelected && <SelectPokemon setPokemonSelected={setPokemonSelected} />}
      {pokemonSelected && (
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-8 xs:col-span-2">
            <Pokemons />
            <CustomLink href="/arena">
              <div className="flex items-center gap-2 p-2 px-8 border-2 border-yellow-400 border-solid bg-gradient-to-t from-black to-yellow-500 max-w-max">
                <span className="font-semibold text-white">Go to Arena</span>
              </div>
            </CustomLink>
          </div>
          <div className="xs:col-span-2">
            <LeaderBoard />
          </div>
        </div>
      ) }
    </div>
  )
}

export default Dashboard
