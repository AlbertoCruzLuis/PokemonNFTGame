import { writeFile } from "./writeFile"
import { getPokemonData } from "./PokeApiData/getPokemonsData";

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
