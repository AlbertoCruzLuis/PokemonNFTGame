import { fetchAllHealing } from "./PokeAPI/Items/Healing"

export const getItemsData = async () => {
  const itemsIndexes: number[] = []
  const itemsNames: string[] = []
  const itemsDescription: string[] = []
  const itemsImageURIs: string[] = []
  const itemsCategory: number[] = []
  const itemsCost: number[] = []

  const healings = await fetchAllHealing()

  healings.map((item) => {
    itemsIndexes.push(item.id)
    itemsNames.push(item.name)
    itemsDescription.push(item.effect_entries[0].short_effect)
    itemsImageURIs.push(item.sprites.default)
    itemsCategory.push(item.category.name)
    itemsCost.push(item.cost)
  })

  return {
    itemsIndexes,
    itemsNames,
    itemsDescription,
    itemsImageURIs,
    itemsCategory,
    itemsCost
  }
}

getItemsData()
