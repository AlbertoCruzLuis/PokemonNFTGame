import type { ImageLoaderProps } from "next/image"

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://raw.githubusercontent.com/PokeAPI/${src}?w=${width}&q=${quality || 75}`
}
