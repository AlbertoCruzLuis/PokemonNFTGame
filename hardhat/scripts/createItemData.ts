import { writeFile } from "./writeFile"
import { getItemsData } from "./PokeApiData/getItemsData";

const createItemData = async () => {
  const {
    itemsIndexes,
    itemsNames,
    itemsDescription,
    itemsImageURIs,
    itemsCategory,
    itemsCost
  } = await getItemsData()

  const jsData = `export const items = {
    itemsIndexes: [${itemsIndexes}],
    itemsNames: [${itemsNames.map(name => `"${name}"`)}],
    itemsDescription: [${itemsDescription.map(description => `"${description}"`)}],
    itemsImageURIs: [${itemsImageURIs.map(imageURI => `"${imageURI}"`)}],
    itemsCategory: [${itemsCategory.map(category => `"${category}"`)}],
    itemsCost: [${itemsCost}],
    itemsEffect: [${itemsDescription.map(description => getEffectOfItem(description))}]
  }`

  writeFile('./data/items.ts', jsData);
}

const getEffectOfItem = (description: string) => {
  let regex_full = new RegExp('HP to full')
  let regex_number = new RegExp('[0-9]+ HP')

  if (regex_full.test(description)) {
    return 99999
  }

  if (regex_number.test(description)) {
    const match = description.match(regex_number)
    if (!match) return

    const firstMatch  = match[0]
    const valueOfEffect = firstMatch.split(" ")[0]
    return parseInt(valueOfEffect)
  }
}

createItemData()
