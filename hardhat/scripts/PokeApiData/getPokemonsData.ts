import fetch from 'node-fetch';

const fetchPokemon = async (index: number) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${index}`
  )
  return await response.json()
}

enum STATS {
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed
}

export const getPokemonData = async (limit: number) => {
  const characterNames: string[] = []
  const characterIndexes: number[] = []
  const characterImageURIs: string[] = []
  const characterHp: number[] = []
  const characterAttack: number[] = []

  for (let index = 1; index <= limit; index++) {
    const pokemon = await fetchPokemon(index)
    characterNames.push(pokemon.name)
    characterIndexes.push(pokemon.id)
    characterImageURIs.push(pokemon.sprites.other.home.front_default)
    characterHp.push(pokemon.stats[STATS.hp].base_stat)
    characterAttack.push(pokemon.stats[STATS.attack].base_stat)
  }

  return {
    characterNames,
    characterIndexes,
    characterImageURIs,
    characterHp,
    characterAttack,
  }
}

