import fs from "fs"

export const writeFile = (outputFile: string, content: string) => {
  fs.writeFile(outputFile, content , (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}
