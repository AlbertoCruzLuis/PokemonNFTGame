export const middleStringTruncate = (word: string, start: number, end: number) => {
  const lowerMiddle = word.slice(0, start).concat("...")
  const upperMiddle = word.slice(word.length - end, word.length)
  return lowerMiddle + upperMiddle
}
