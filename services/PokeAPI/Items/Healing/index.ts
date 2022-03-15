import { CATEGORY, fetchItemsOfCategory } from "../category"
import { fetchURL } from "services/PokeAPI"

export const fetchAllHealing = async () => {
  const { items } = await fetchItemsOfCategory(CATEGORY.HEALING)
  const itemsData = await Promise.all(
    items?.map(async (item: any) => await fetchURL(item.url))
  )

  return itemsData
}
