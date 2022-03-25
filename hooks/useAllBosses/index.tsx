import { POKEMON_GAME_ADDRESS } from "config"
import PokemonGameContract from "hardhat/artifacts/contracts/Pokemon/PokemonGame.sol/PokemonGame.json"
import { useContract } from "hooks/useContract"
import { Contract } from "ethers"
import { transformPokemonData } from "lib/getNftMetadata"
import { useQuery } from "react-query"

export const useAllBosses = () => {
  const { contract: gameContract } = useContract<Contract>({
    contractAddress: POKEMON_GAME_ADDRESS,
    contractJson: PokemonGameContract
  })

  const getAllBosses = async () => {
    if (!gameContract) return []

    const bossesIdsRaw = await gameContract.getAllBossesIds()
    const bossesIds = bossesIdsRaw.map((bossId: any) => bossId.toNumber())
    const bossList = await Promise.all(bossesIds.map(async (id: any) => {
      const bossRaw = await gameContract.getBoss(id)
      const boss = await gameContract.getPokemonReadable(bossRaw)

      return transformPokemonData(boss)
    }))
    return bossList
  }

  const { data: bosses } = useQuery(["bosses"], getAllBosses, { enabled: !!gameContract })

  return {
    bosses
  }
}
