export interface IPokemonData {
  id: number,
  name: string,
  imageURI: string,
  hp: number,
  maxHp: number,
  attack: number,
  level: number,
  experience: number
}

export interface IItemData {
  id: number,
  name: string,
  description: string,
  imageURI: string,
  category: string,
  cost: number,
  amount: number,
  effect: number
}

export const transformPokemonData = (pokemonData: any): IPokemonData => {
  return {
    id: pokemonData.info.id.toNumber(),
    name: pokemonData.info.name,
    imageURI: pokemonData.info.imageURI,
    hp: pokemonData.stats.hp.toNumber(),
    maxHp: pokemonData.stats.maxHp.toNumber(),
    attack: pokemonData.stats.attack.toNumber(),
    level: pokemonData.level.toNumber(),
    experience: pokemonData.experience.toNumber()
  }
}

export const transformItemData = (itemData: any): IItemData => {
  return {
    id: itemData.info.id.toNumber(),
    name: itemData.info.name,
    description: itemData.info.description,
    imageURI: itemData.info.imageURI,
    category: itemData.info.category,
    cost: itemData.cost.toNumber(),
    amount: itemData.amount.toNumber(),
    effect: itemData.info.effect.toNumber()
  }
}
