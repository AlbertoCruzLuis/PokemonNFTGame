export interface ICharacterData {
  name: string,
  imageURI: string,
  hp: number,
  maxHp: number,
  attackDamage: number,
  level: number,
  experience: number
}

export const transformCharacterData = (characterData: any): ICharacterData => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.stats.hp.toNumber(),
    maxHp: characterData.stats.maxHp.toNumber(),
    attackDamage: characterData.stats.attackDamage.toNumber(),
    level: characterData.level.toNumber(),
    experience: characterData.experience.toNumber()
  }
}
