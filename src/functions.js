/**
 * FUNCTIONS
 */
// Get materials on MTL File
export const GetMaterialsOnMTLFile = async (url) => {
  const res = await fetch(url)
  const texte = await res.text()
  const materialsNames = []

  const lines = texte.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line.startsWith('newmtl ')) {
      const mtlName = line.substring(7)

      if (line.endsWith('Mtl')) {
        const name = mtlName.substring(0, mtlName.length - 3)

        materialsNames.push(name)
    //   } else {
    //     materialsNames.push(mtlName)
      }
    }
  }

  return materialsNames
}