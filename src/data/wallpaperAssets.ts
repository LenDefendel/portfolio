const imageModules = import.meta.glob('@/assets/wallpaper/**/*.{jpg,png,svg,gif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const folderImages: Record<string, string[]> = {}

for (const [filePath, url] of Object.entries(imageModules)) {
  const match = filePath.match(/wallpaper\/([^/]+)\//)
  if (match && match[1]) {
    const folder = match[1]
    if (!folderImages[folder]) {
      folderImages[folder] = []
    }
    folderImages[folder].push(url as string)
  }
}
