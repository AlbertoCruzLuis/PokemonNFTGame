export interface IPokemonData {
  name: string,
  imageURI: string,
  hp: number,
  maxHp: number,
  attack: number,
  level: number,
  experience: number
}

export const transformPokemonData = (pokemonData: any): IPokemonData => {
  return {
    name: pokemonData.info.name,
    imageURI: pokemonData.info.imageURI,
    hp: pokemonData.stats.hp.toNumber(),
    maxHp: pokemonData.stats.maxHp.toNumber(),
    attack: pokemonData.stats.attack.toNumber(),
    level: pokemonData.level.toNumber(),
    experience: pokemonData.experience.toNumber()
  }
}
