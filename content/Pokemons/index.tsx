import { usePokemonListNFT } from "hooks/usePokemonListNFT"
import { BattleCard } from "components/PokemonCards/BattleCard"
import { v4 as uuidv4 } from "uuid"
import { useWeb3 } from "@3rdweb/hooks"

export const Pokemons = () => {
  const { address } = useWeb3()
  const { pokemons } = usePokemonListNFT(address)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">Pokemons</h2>
      {pokemons && pokemons.map(({ name, hp, maxHp, level, experience }) => (
        <BattleCard
          key={uuidv4()}
          name={name}
          hp={hp}
          maxHp={maxHp}
          level={level}
          experience={experience} />
      ))}
    </div>
  )
}
