const generateTemplate = (fileNames: string[]): string => {
  if (!fileNames || fileNames.length === 0) return ''

  // Find the common prefix
  let prefixLength = 0
  const firstFile = fileNames[0]

  while (prefixLength < firstFile.length && fileNames.every((name) => name[prefixLength] === firstFile[prefixLength])) {
    prefixLength++
  }

  // Find the common suffix
  let suffixLength = 0
  const minLength = Math.min(...fileNames.map((name) => name.length))

  while (
    suffixLength < minLength - prefixLength &&
    fileNames.every((name) => name[name.length - 1 - suffixLength] === firstFile[firstFile.length - 1 - suffixLength])
  ) {
    suffixLength++
  }

  // Extract prefix and suffix from the first file
  const prefix = firstFile.slice(0, prefixLength)
  const suffix = firstFile.slice(firstFile.length - suffixLength)

  // The rest of the string is the variable part (page number)
  return `${prefix}{page}${suffix}`
}

export { generateTemplate }
