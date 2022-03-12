import fs from "fs"
import { getPokemonData } from "./getPokeApiData";

const createPokemonData = async (limit: number) => {
  const {
    characterIndexes,
    characterNames,
    characterImageURIs,
    characterHp,
    characterAttack
  } = await getPokemonData(limit)

  const jsData = `export const pokemons = {
    characterIndexes: [${characterIndexes}],
    characterNames: [${characterNames.map(name => `"${name}"`)}],
    characterImageURIs: [${characterImageURIs.map(imageURI => `"${imageURI}"`)}],
    characterHp: [${characterHp}],
    characterAttack: [${characterAttack}]
  }`

  writeFile('./data/pokemon.ts', jsData);
}

createPokemonData(150)


const writeFile = (outputFile: string, content: string) => {
  fs.writeFile(outputFile, content , (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}

const getPokemonJsonData = () => {

}
